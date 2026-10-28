import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Clock, CheckCircle2, ChevronRight, FileText } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

const mockRedacoes = [
  {
    id: '1',
    tema: 'O impacto da inteligência artificial na segurança pública e no mercado de trabalho',
    data: '24 Out 2026',
    status: 'corrigida',
    nota: '880/1000',
  },
  {
    id: '2',
    tema: 'Os desafios da educação inclusiva na era digital',
    data: '18 Out 2026',
    status: 'corrigida',
    nota: '920/1000',
  },
  {
    id: '3',
    tema: 'Mobilidade urbana e os transportes sustentáveis nas metrópoles',
    data: '26 Out 2026',
    status: 'em_avaliacao',
    nota: null,
  },
];

export default function MinhasRedacoesScreen({ navigation }) {
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
          <Text style={styles.headerTitle}>Minhas Redações</Text>
        </View>

        <Text style={styles.subtitle}>
          Acompanhe as suas submissões e avaliações detalhadas
        </Text>

        {mockRedacoes.map((item) => {
          const isCompleted = item.status === 'corrigida';
          return (
            <View key={item.id} style={styles.essayCard}>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.statusBadge,
                    isCompleted ? styles.statusBadgeCompleted : styles.statusBadgePending,
                  ]}
                >
                  <Text
                    style={
                      isCompleted ? styles.statusTextCompleted : styles.statusTextPending
                    }
                  >
                    {isCompleted ? 'CORRIGIDA' : 'EM AVALIAÇÃO'}
                  </Text>
                </View>
                <Text style={styles.dateText}>{item.data}</Text>
              </View>

              <Text style={styles.essayTitle}>{item.tema}</Text>

              <View style={styles.scoreRow}>
                {isCompleted ? (
                  <View style={styles.scoreInfo}>
                    <Text style={styles.scoreLabel}>Nota final:</Text>
                    <Text style={styles.scoreValue}>{item.nota}</Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Clock color={theme.colors.gold} size={16} />
                    <Text style={{ color: theme.colors.gold, fontSize: 13 }}>
                      Em processo de correção
                    </Text>
                  </View>
                )}

                <TouchableOpacity style={styles.btnDetails} activeOpacity={0.8}>
                  <Text style={styles.btnDetailsText}>
                    {isCompleted ? 'Ver Correção' : 'Ver Texto'}
                  </Text>
                  <ChevronRight color={theme.colors.muted} size={16} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}