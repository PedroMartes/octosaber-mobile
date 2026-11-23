import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { getEssays } from '../../services/api';
import { styles } from './styles';

export default function MinhasRedacoesScreen({ navigation }) {
  const [essays, setEssays] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getEssays()
      .then((data) => {
        if (active) setEssays(data);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerNav}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <ArrowLeft color={theme.colors.white} size={20} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Minhas Redações</Text>
        </View>

        <Text style={styles.subtitle}>
          Acompanhe as redações enviadas e suas avaliações.
        </Text>

        {loading ? <ActivityIndicator color={theme.colors.lime} /> : null}
        {error ? <Text style={{ color: theme.colors.red }}>{error}</Text> : null}
        {!loading && !error && essays.length === 0 ? (
          <View style={styles.essayCard}>
            <Text style={styles.essayTitle}>Você ainda não enviou redações.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Redacao')}>
              <Text style={{ color: theme.colors.lime }}>Escrever redação</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {essays.map((item) => {
          const status = String(item.status || 'ENVIADA').toUpperCase();
          const isCompleted =
            status.includes('CORRIG') ||
            status.includes('AVALI') ||
            item.nota !== null && item.nota !== undefined;
          const expanded = expandedId === item.id_redacao;
          const date = item.enviada_em
            ? String(item.enviada_em).split(' ')[0]
            : 'Data indisponível';

          return (
            <View key={item.id_redacao} style={styles.essayCard}>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.statusBadge,
                    isCompleted
                      ? styles.statusBadgeCompleted
                      : styles.statusBadgePending,
                  ]}
                >
                  <Text
                    style={
                      isCompleted
                        ? styles.statusTextCompleted
                        : styles.statusTextPending
                    }
                  >
                    {isCompleted ? 'AVALIADA' : status}
                  </Text>
                </View>
                <Text style={styles.dateText}>{date}</Text>
              </View>

              <Text style={styles.essayTitle}>
                {item.titulo || item.tema || 'Redação sem título'}
              </Text>

              <View style={styles.scoreRow}>
                {isCompleted ? (
                  <View style={styles.scoreInfo}>
                    <Text style={styles.scoreLabel}>Nota:</Text>
                    <Text style={styles.scoreValue}>{item.nota}</Text>
                  </View>
                ) : (
                  <Text style={{ color: theme.colors.gold, fontSize: 13 }}>
                    Aguardando avaliação
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.btnDetails}
                  onPress={() =>
                    setExpandedId(expanded ? null : item.id_redacao)
                  }
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnDetailsText}>
                    {expanded ? 'Fechar texto' : 'Ver texto'}
                  </Text>
                  <ChevronRight color={theme.colors.muted} size={16} />
                </TouchableOpacity>
              </View>

              {expanded ? (
                <Text style={{ color: theme.colors.muted, lineHeight: 20 }}>
                  {item.texto}
                </Text>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
