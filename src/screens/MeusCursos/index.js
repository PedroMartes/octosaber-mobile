import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react-native';
import { getCourses, getProgress } from '../../services/api';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export default function MeusCursosScreen({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCourses = useCallback(() => {
    setLoading(true);
    setError('');

    return Promise.all([getProgress(), getCourses()])
      .then(([progress, availableCourses]) => {
        const coursesById = new Map(
          availableCourses.map((course) => [String(course.id_curso), course])
        );
        const enrolledCourses = progress
          .filter((enrollment) =>
            ['ATIVO', 'CONCLUIDO'].includes(
              String(enrollment.status).toUpperCase()
            )
          )
          .map((enrollment) => {
            const course = coursesById.get(String(enrollment.id_curso));
            return {
              ...course,
              ...enrollment,
              id_curso: enrollment.id_curso,
              nome: course?.nome || enrollment.curso,
              categoria: course?.categoria || '',
              descricao: course?.descricao || '',
              quantidade_aulas: Number(course?.quantidade_aulas) || 0,
            };
          });

        setCourses(enrolledCourses);
      })
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCourses();
    }, [loadCourses])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <ArrowLeft color={theme.colors.white} size={20} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Meus Cursos</Text>
            <Text style={styles.subtitle}>Cursos em que você está matriculado</Text>
          </View>
        </View>

        {loading ? <ActivityIndicator color={theme.colors.lime} /> : null}
        {error ? (
          <View style={styles.emptyCard}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={loadCourses} activeOpacity={0.8}>
              <Text style={styles.linkText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {!loading && !error && courses.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              Você ainda não está matriculado em nenhum curso.
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HomeTabs', { screen: 'Cursos' })
              }
              activeOpacity={0.8}
            >
              <Text style={styles.linkText}>Explorar cursos</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {courses.map((course) => {
          const progress = Math.min(
            100,
            Math.max(0, Math.round(Number(course.percentual_conclusao) || 0))
          );
          const completed =
            progress >= 100 || String(course.status).toUpperCase() === 'CONCLUIDO';

          return (
            <View key={course.id_curso} style={styles.courseCard}>
              <View style={styles.cardHeader}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {course.categoria || (completed ? 'Concluído' : 'Matriculado')}
                  </Text>
                </View>
                {completed ? (
                  <CheckCircle2 color={theme.colors.lime} size={20} />
                ) : null}
              </View>

              <Text style={styles.courseTitle}>{course.nome}</Text>
              {course.descricao ? (
                <Text style={styles.courseDescription}>{course.descricao}</Text>
              ) : null}

              <View style={styles.courseInfo}>
                <View style={styles.lessonCount}>
                  <BookOpen color={theme.colors.muted} size={16} />
                  <Text style={styles.infoText}>
                    {course.quantidade_aulas}{' '}
                    {course.quantidade_aulas === 1 ? 'aula' : 'aulas'}
                  </Text>
                </View>
                <Text style={styles.infoText}>{progress}% concluído</Text>
              </View>

              <View style={styles.progressBarBackground}>
                <View
                  style={[styles.progressBarFill, { width: `${progress}%` }]}
                />
              </View>

              <TouchableOpacity
                style={styles.accessButton}
                onPress={() =>
                  navigation.navigate('CursoDetail', {
                    idCurso: course.id_curso,
                  })
                }
                activeOpacity={0.8}
              >
                <Text style={styles.accessButtonText}>
                  {completed ? 'Ver curso' : 'Continuar estudando'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
