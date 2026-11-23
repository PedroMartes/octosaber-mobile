import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Download, ArrowLeft } from 'lucide-react-native';
import Mascote from '../../components/Mascote';
import { theme } from '../../styles/theme';
import { styles } from './styles';
import { getAssetUrl, getMaterials } from '../../services/api';

export default function MateriaisScreen({ navigation }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getMaterials()
      .then((data) => {
        if (active) setMaterials(data);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleDownload(material) {
    const url = getAssetUrl(material.arquivo_url);
    if (!url) {
      setError('Este material ainda não possui um arquivo disponível.');
      return;
    }

    try {
      await Linking.openURL(url);
    } catch (openError) {
      setError(openError.message || 'Não foi possível abrir o arquivo.');
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.tipo || 'ARQUIVO'}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.cardMeta}>
          {Number(item.tamanho_bytes) > 0
            ? `${(Number(item.tamanho_bytes) / (1024 * 1024)).toFixed(1)} MB`
            : 'Arquivo complementar'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() => handleDownload(item)}
        activeOpacity={0.8}
      >
        <Download color={theme.colors.background} size={16} />
        <Text style={styles.downloadButtonText}>Abrir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={materials}
        keyExtractor={(item) => String(item.id_material)}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation?.goBack()}
              activeOpacity={0.7}
            >
              <ArrowLeft color={theme.colors.white} size={20} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.title}>Materiais</Text>
              <Text style={styles.subtitle}>Acesse arquivos e materiais complementares</Text>
            </View>
            <Mascote size={60} />
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={theme.colors.lime} />
          ) : error ? (
            <Text style={{ color: theme.colors.red }}>{error}</Text>
          ) : (
            <Text style={styles.subtitle}>Nenhum material disponível.</Text>
          )
        }
      />
      {error && materials.length > 0 ? (
        <Text style={{ color: theme.colors.red, paddingHorizontal: 20 }}>{error}</Text>
      ) : null}
    </SafeAreaView>
  );
}