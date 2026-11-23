import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  Download,
} from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';
import { completeLesson, getAssetUrl } from '../../services/api';

export default function AulaScreen({ navigation, route }) {
  const params = route.params || {};
  const aula = params.aula || {};
  const videoUrl = getAssetUrl(aula.video_url);
  const [concluida, setConcluida] = useState(Boolean(Number(aula.concluida)));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const player = useVideoPlayer(videoUrl, () => {});
  const { status, error: playbackError } = useEvent(
    player,
    'statusChange',
    { status: player.status, error: player.error }
  );

  async function handleComplete() {
    if (!params.matriculado) {
      setError('Matricule-se no curso antes de registrar o progresso.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await completeLesson(aula.id_aula);
      setConcluida(true);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleOpenMaterial() {
    try {
      await Linking.openURL(getAssetUrl(aula.material_url));
    } catch (openError) {
      setError(openError.message || 'Não foi possível abrir o material.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <ArrowLeft color={theme.colors.white} size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Aula {String(aula.numero_aula || '').padStart(2, '0')} • {aula.titulo || 'Aula'}
        </Text>
      </View>

      <ScrollView>
        <View style={styles.videoArea}>
          {videoUrl ? (
            <VideoView
              style={styles.videoArea}
              player={player}
              contentFit="contain"
              fullscreenOptions={{ enable: true }}
            />
          ) : (
            <Text style={styles.videoMessage}>Esta aula ainda não tem vídeo.</Text>
          )}
        </View>

        {videoUrl && status === 'loading' ? (
          <ActivityIndicator style={styles.videoStatus} color={theme.colors.lime} />
        ) : null}
        {playbackError ? (
          <Text style={styles.videoError}>
            Não foi possível carregar o vídeo. Coloque o arquivo indicado no servidor.
          </Text>
        ) : null}

        <View style={styles.content}>
          <View style={styles.lessonHeader}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{params.cursoNome || 'Curso'}</Text>
            </View>
            <Text style={styles.lessonTitle}>{aula.titulo || 'Aula'}</Text>
            <Text style={styles.lessonDesc}>{aula.descricao || ''}</Text>
          </View>

          <TouchableOpacity
            style={[styles.btnComplete, concluida && styles.btnCompleteActive]}
            onPress={handleComplete}
            disabled={saving || concluida}
            activeOpacity={0.8}
          >
            {saving ? (
              <ActivityIndicator color={theme.colors.lime} />
            ) : (
              <>
                <CheckCircle
                  color={concluida ? '#112000' : theme.colors.lime}
                  size={18}
                />
                <Text
                  style={[
                    styles.btnCompleteText,
                    concluida && styles.btnCompleteTextActive,
                  ]}
                >
                  {concluida ? 'Aula Concluída' : 'Marcar como Concluída'}
                </Text>
              </>
            )}
          </TouchableOpacity>

          {aula.material_url ? (
            <View style={{ gap: 10 }}>
              <Text style={styles.sectionTitle}>Material de Apoio</Text>
              <TouchableOpacity
                style={styles.materialCard}
                onPress={handleOpenMaterial}
                activeOpacity={0.8}
              >
                <View style={styles.materialInfo}>
                  <FileText color={theme.colors.lime} size={20} />
                  <Text style={styles.materialTitle}>Abrir material da aula</Text>
                </View>
                <Download color={theme.colors.muted} size={18} />
              </TouchableOpacity>
            </View>
          ) : null}

          {error ? <Text style={styles.videoError}>{error}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
