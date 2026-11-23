import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

function formatDuration(totalSeconds = 0) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours) return `${hours}h ${minutes}m`;
  if (minutes) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export default function ResultadoSimuladoScreen({ navigation, route }) {
  const result = route.params?.result;
  const total = result?.total || 0;
  const correct = result?.correct || 0;
  const incorrect = Math.max(0, total - correct);
  const percentage = total ? Math.round((correct / total) * 100) : 0;
  const title =
    percentage >= 80
      ? 'Excelente desempenho!'
      : percentage >= 60
        ? 'Bom trabalho!'
        : 'Continue praticando!';

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
          <Text style={styles.headerTitle}>Resultado do Simulado</Text>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>{percentage}%</Text>
            <Text style={styles.scoreSubtext}>Aproveitamento</Text>
          </View>
          <Text style={styles.scoreTitle}>{title}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <CheckCircle2 color={theme.colors.lime} size={20} />
            <Text style={[styles.statValue, { color: theme.colors.lime }]}>
              {correct}
            </Text>
            <Text style={styles.statLabel}>Acertos</Text>
          </View>

          <View style={styles.statCard}>
            <XCircle color={theme.colors.red} size={20} />
            <Text style={[styles.statValue, { color: theme.colors.red }]}>
              {incorrect}
            </Text>
            <Text style={styles.statLabel}>Erros</Text>
          </View>

          <View style={styles.statCard}>
            <Clock color={theme.colors.muted} size={20} />
            <Text style={[styles.statValue, { color: theme.colors.white }]}>
              {formatDuration(result?.elapsedSeconds)}
            </Text>
            <Text style={styles.statLabel}>Tempo</Text>
          </View>

          <View style={styles.statCard}>
            <Zap color={theme.colors.gold} size={20} />
            <Text style={[styles.statValue, { color: theme.colors.gold }]}>
              +{result?.xp || 0} XP
            </Text>
            <Text style={styles.statLabel}>Ganhos</Text>
          </View>
        </View>

        <View style={styles.feedbackCard}>
          <Text style={styles.sectionTitle}>Desempenho por Disciplina</Text>
          {result?.byDiscipline?.length ? (
            result.byDiscipline.map((item) => {
              const disciplinePercentage = item.total
                ? Math.round((item.correct / item.total) * 100)
                : 0;
              return (
                <View key={item.disciplina} style={styles.disciplineRow}>
                  <Text style={styles.disciplineName}>{item.disciplina}</Text>
                  <Text style={styles.disciplineScore}>
                    {item.correct}/{item.total} ({disciplinePercentage}%)
                  </Text>
                </View>
              );
            })
          ) : (
            <Text style={styles.disciplineName}>
              Nenhum resultado de desempenho disponível.
            </Text>
          )}
        </View>

        <View style={{ gap: 10, marginTop: 8 }}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => navigation.navigate('HomeTabs')}
            activeOpacity={0.8}
          >
            <Text style={styles.btnPrimaryText}>Voltar ao Início</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => navigation.replace('Simulados')}
            activeOpacity={0.8}
          >
            <Text style={styles.btnSecondaryText}>Refazer Simulado</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
