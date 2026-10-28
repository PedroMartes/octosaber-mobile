import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

const mockDesempenho = [
  { disciplina: 'Direito Constitucional', acertos: '8/10', porc: '80%' },
  { disciplina: 'Língua Portuguesa', acertos: '15/20', porc: '75%' },
  { disciplina: 'Raciocínio Lógico', acertos: '7/10', porc: '70%' },
];

export default function ResultadoSimuladoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header / Voltar */}
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

        {/* Score Principal */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>77%</Text>
            <Text style={styles.scoreSubtext}>Aproveitamento</Text>
          </View>
          <Text style={styles.scoreTitle}>Excelente Desempenho!</Text>
        </View>

        {/* Métricas do Simulado */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <CheckCircle2 color={theme.colors.lime} size={20} />
            <Text style={[styles.statValue, { color: theme.colors.lime }]}>30</Text>
            <Text style={styles.statLabel}>Acertos</Text>
          </View>

          <View style={styles.statCard}>
            <XCircle color={theme.colors.red} size={20} />
            <Text style={[styles.statValue, { color: theme.colors.red }]}>9</Text>
            <Text style={styles.statLabel}>Erros</Text>
          </View>

          <View style={styles.statCard}>
            <Clock color={theme.colors.muted} size={20} />
            <Text style={[styles.statValue, { color: theme.colors.white }]}>1h 45m</Text>
            <Text style={styles.statLabel}>Tempo</Text>
          </View>

          <View style={styles.statCard}>
            <Zap color={theme.colors.gold} size={20} />
            <Text style={[styles.statValue, { color: theme.colors.gold }]}>+120 XP</Text>
            <Text style={styles.statLabel}>Ganhos</Text>
          </View>
        </View>

        {/* Desempenho por Disciplina */}
        <View style={styles.feedbackCard}>
          <Text style={styles.sectionTitle}>Desempenho por Disciplina</Text>
          {mockDesempenho.map((item, index) => (
            <View key={index} style={styles.disciplineRow}>
              <Text style={styles.disciplineName}>{item.disciplina}</Text>
              <Text style={styles.disciplineScore}>
                {item.acertos} ({item.porc})
              </Text>
            </View>
          ))}
        </View>

        {/* Botões de Ação */}
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
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.btnSecondaryText}>Refazer Simulado</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}