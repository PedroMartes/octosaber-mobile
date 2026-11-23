import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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
} from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';
import { getHomeData } from '../../services/api';

export default function HomeScreen({ navigation }) {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadHomeData = useCallback(() => {
    setLoading(true);
    setError('');
    return getHomeData()
      .then((data) => {
        setHomeData(data);
      })
      .catch((loadError) => {
        setError(loadError.message || 'Não foi possível carregar seus dados.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHomeData();
    }, [loadHomeData])
  );

  const user = homeData && homeData.user;
  const statistics = homeData && homeData.statistics;
  const courses = homeData && homeData.courses;
  const currentCourse = courses && courses[0];
  const hoursStudied = statistics ? Number(statistics.horas_totais) || 0 : null;
  const xpTotal = statistics ? Number(statistics.xp_total) || 0 : null;
  const currentStreak = statistics ? Number(statistics.sequencia_atual) || 0 : null;
  const studiedDays = statistics ? Number(statistics.dias_estudados) || 0 : null;
  const bestStreak = statistics ? Number(statistics.maior_sequencia) || 0 : null;
  const courseProgress = currentCourse
    ? Math.max(0, Math.min(100, Number(currentCourse.percentual_conclusao) || 0))
    : 0;

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
              <Text style={styles.userName}>
                {loading ? 'Carregando...' : user ? user.nome : 'Estudante'}
              </Text>
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

        </View>

        <View>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Resumo de estudos</Text>
            <View style={styles.metaBadge}>
              <Text style={styles.metaBadgeText}>HISTÓRICO</Text>
            </View>
          </View>

          <View style={styles.dayCard}>
            <View style={styles.dayProgressInfo}>
              <Text style={styles.dayProgressLabel}>Horas de estudo acumuladas</Text>
              <Text style={styles.dayProgressValue}>
                {hoursStudied === null ? '—' : `${hoursStudied.toLocaleString('pt-BR')} h`}
              </Text>
            </View>

            <View style={styles.dayStatsRow}>
              <View style={styles.dayStatItem}>
                <Calendar color={theme.colors.lime} size={16} />
                <View>
                  <Text style={styles.dayStatValue}>
                    {studiedDays === null ? '—' : studiedDays}
                  </Text>
                  <Text style={styles.dayStatLabel}>Dias estudados</Text>
                </View>
              </View>

              <View style={styles.dayStatItem}>
                <Flame color={theme.colors.gold} size={16} />
                <View>
                  <Text style={styles.dayStatValue}>
                    {bestStreak === null ? '—' : bestStreak}
                  </Text>
                  <Text style={styles.dayStatLabel}>Maior sequência</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Métrica de Sequência e XP */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Flame color={theme.colors.gold} size={22} />
            <Text style={styles.statValue}>
              {currentStreak === null ? '—' : `${currentStreak} dias`}
            </Text>
            <Text style={styles.statLabel}>Sequência</Text>
          </View>

          <View style={styles.statCard}>
            <Zap color={theme.colors.lime} size={22} />
            <Text style={styles.statValue}>
              {xpTotal === null ? '—' : xpTotal.toLocaleString('pt-BR')}
            </Text>
            <Text style={styles.statLabel}>XP Total</Text>
          </View>
        </View>

        {/* Continuar Estudando */}
        <View>
          <Text style={styles.sectionTitle}>Seus cursos</Text>
          {currentCourse ? (
            <View style={styles.continueCard}>
              <Text style={styles.continueTag}>CURSO</Text>
              <Text style={styles.continueCourseTitle}>{currentCourse.curso}</Text>
              <View style={styles.dayProgressInfo}>
                <Text style={styles.dayProgressLabel}>Conclusão</Text>
                <Text style={styles.dayProgressValue}>{courseProgress}%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[styles.progressBarFill, { width: `${courseProgress}%` }]}
                />
              </View>
            </View>
          ) : !loading && !error ? (
            <Text style={styles.emptyState}>
              Você ainda não está matriculado em cursos.
            </Text>
          ) : null}
        </View>

        {loading && !homeData ? (
          <ActivityIndicator color={theme.colors.lime} />
        ) : null}

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              onPress={() => {
                setLoading(true);
                setError('');
                loadHomeData();
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.retryText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : null}

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