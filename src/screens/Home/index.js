import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import {
  User,
  Flame,
  Zap,
  FileText,
  CheckSquare,
  BookOpen,
  Award,
  Library,
  FolderDown,
  Calendar,
  Tv
} from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Cabeçalho do Utilizador */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <User color={theme.colors.lime} size={22} />
            </View>
            <View>
              <Text style={styles.greeting}>Bem-vindo de volta,</Text>
              <Text style={styles.userName}>Estudante</Text>
            </View>
          </View>
        </View>

        {/* Card Hero Principal (Desktop Top Banner) */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>BEM-VINDO AO OCTOSABER</Text>
          </View>
          <Text style={styles.heroTitle}>Seu próximo nível começa hoje.</Text>
          <Text style={styles.heroSubtitle}>
            Organize sua preparação, acompanhe seu desempenho e transforme horas de estudo em progresso real.
          </Text>

          <View style={styles.heroActions}>
            <TouchableOpacity
              style={styles.heroPrimaryButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Cursos')}
            >
              <Text style={styles.heroPrimaryText}>Continuar estudos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.heroSecondaryButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Simulados')}
            >
              <Text style={styles.heroSecondaryText}>Fazer simulado</Text>
            </TouchableOpacity>
          </View>

          {/* Progresso de XP e Nível */}
          <View style={styles.xpCard}>
            <View style={styles.xpHeader}>
              <Text style={styles.xpLevel}>Ócto • Nível 3</Text>
              <Text style={styles.xpValue}>2.450 / 3.000 XP</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '81%' }]} />
            </View>
            <Text style={styles.xpSubtext}>550 XP para evoluir</Text>
          </View>
        </View>

        {/* Card "Seu dia" (Desktop Bottom Card) */}
        <View>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Seu dia</Text>
            <View style={styles.metaBadge}>
              <Text style={styles.metaBadgeText}>META 2H</Text>
            </View>
          </View>

          <View style={styles.dayCard}>
            <View style={styles.dayProgressInfo}>
              <Text style={styles.dayProgressLabel}>Progresso diário</Text>
              <Text style={styles.dayProgressValue}>1h20 / 2h</Text>
            </View>

            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '66%' }]} />
            </View>

            <View style={styles.dayStatsRow}>
              <View style={styles.dayStatItem}>
                <Tv color={theme.colors.lime} size={16} />
                <View>
                  <Text style={styles.dayStatValue}>40 min</Text>
                  <Text style={styles.dayStatLabel}>Videoaulas</Text>
                </View>
              </View>

              <View style={styles.dayStatItem}>
                <CheckSquare color={theme.colors.lime} size={16} />
                <View>
                  <Text style={styles.dayStatValue}>30 questões</Text>
                  <Text style={styles.dayStatLabel}>Questões</Text>
                </View>
              </View>

              <View style={styles.dayStatItem}>
                <FileText color={theme.colors.lime} size={16} />
                <View>
                  <Text style={styles.dayStatValue}>1 redação</Text>
                  <Text style={styles.dayStatLabel}>Próxima atividade</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Métrica de Sequência e XP */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Flame color={theme.colors.gold} size={22} />
            <Text style={styles.statValue}>5 Dias</Text>
            <Text style={styles.statLabel}>Sequência</Text>
          </View>

          <View style={styles.statCard}>
            <Zap color={theme.colors.lime} size={22} />
            <Text style={styles.statValue}>1.250</Text>
            <Text style={styles.statLabel}>XP Total</Text>
          </View>
        </View>

        {/* Continuar Estudando */}
        <View>
          <Text style={styles.sectionTitle}>Em Andamento</Text>
          <TouchableOpacity style={styles.continueCard} activeOpacity={0.8}>
            <Text style={styles.continueTag}>AULA 4 DE 12</Text>
            <Text style={styles.continueCourseTitle}>Direito Constitucional para Concursos</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '33%' }]} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Acesso Rápido */}
        <View>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Questoes')}
            >
              <CheckSquare color={theme.colors.lime} size={24} />
              <Text style={styles.gridTitle}>Questões</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Cursos')}
            >
              <BookOpen color={theme.colors.lime} size={24} />
              <Text style={styles.gridTitle}>Cursos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Redacao')}
            >
              <FileText color={theme.colors.lime} size={24} />
              <Text style={styles.gridTitle}>Redação</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Simulados')}
            >
              <Award color={theme.colors.lime} size={24} />
              <Text style={styles.gridTitle}>Simulados</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Biblioteca')}
            >
              <Library color={theme.colors.lime} size={24} />
              <Text style={styles.gridTitle}>Biblioteca</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Materiais')}
            >
              <FolderDown color={theme.colors.lime} size={24} />
              <Text style={styles.gridTitle}>Materiais</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('PlanoDeEstudos')}
            >
              <Calendar color={theme.colors.lime} size={24} />
              <Text style={styles.gridTitle}>Plano</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}