import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ArrowLeft, Check } from 'lucide-react-native';
import {
  completeLesson,
  getCourse,
  getProgress,
} from '../../services/api';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export default function PlanoDeEstudosScreen({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getProgress()
      .then((progress) =>
        Promise.all(
          progress.map(async (enrollment) => {
            const course = await getCourse(enrollment.id_curso);
            return {
              ...enrollment,
              aulas: course.aulas || [],
            };
          })
        )
      )
      .then((data) => {
        if (active) setCourses(data);
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

  const allLessons = useMemo(
    () => courses.flatMap((course) => course.aulas),
    [courses]
  );
  const completedLessons = allLessons.filter(
    (lesson) => Number(lesson.concluida) === 1
  ).length;
  const percentage = allLessons.length
    ? Math.round((completedLessons / allLessons.length) * 100)
    : 0;

  async function toggleLesson(lesson) {
    if (Number(lesson.concluida) === 1 || savingId) return;
    setSavingId(lesson.id_aula);
    setError('');
    try {
      await completeLesson(lesson.id_aula);
      setCourses((currentCourses) =>
        currentCourses.map((course) => ({
          ...course,
          aulas: course.aulas.map((item) =>
            String(item.id_aula) === String(lesson.id_aula)
              ? { ...item, concluida: 1 }
              : item
          ),
        }))
      );
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSavingId(null);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft color={theme.colors.white} size={20} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.title}>Plano de Estudos</Text>
            <Text style={styles.subtitle}>Progresso dos seus cursos</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Progresso geral</Text>
          <Text style={styles.progressSubtitle}>
            {completedLessons} de {allLessons.length} aulas concluídas ({percentage}%)
          </Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
          </View>
        </View>

        {loading ? <ActivityIndicator color={theme.colors.lime} /> : null}
        {error ? <Text style={{ color: theme.colors.red }}>{error}</Text> : null}

        {!loading && !error && courses.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.subject}>
              Matricule-se em um curso para acompanhar seu plano de estudos.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeTabs', { screen: 'Cursos' })}
            >
              <Text style={{ color: theme.colors.lime }}>Explorar cursos</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {courses.map((course) => (
          <View key={course.id_curso}>
            <Text style={styles.sectionTitle}>{course.curso}</Text>
            {course.aulas.map((lesson) => {
              const isCompleted = Number(lesson.concluida) === 1;
              const isSaving = String(savingId) === String(lesson.id_aula);
              return (
                <View
                  key={lesson.id_aula}
                  style={[styles.card, isCompleted && styles.cardCompleted]}
                >
                  <View style={styles.cardInfo}>
                    <Text style={styles.discipline}>
                      Aula {lesson.numero_aula}
                    </Text>
                    <Text style={styles.subject}>{lesson.titulo}</Text>
                    <Text style={styles.duration}>
                      {lesson.duracao_minutos
                        ? `${lesson.duracao_minutos} min`
                        : 'Duração não informada'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.checkbox, isCompleted && styles.checkboxActive]}
                    onPress={() => toggleLesson(lesson)}
                    disabled={isCompleted || Boolean(savingId)}
                    activeOpacity={0.8}
                  >
                    {isSaving ? (
                      <ActivityIndicator color={theme.colors.lime} size="small" />
                    ) : isCompleted ? (
                      <Check
                        color={theme.colors.background}
                        size={18}
                        strokeWidth={3}
                      />
                    ) : null}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
