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
import { ArrowLeft, PlayCircle, BookOpen } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';
import {
  enrollInCourse,
  getCourse,
  getProgress,
} from '../../services/api';

export default function CursoDetailScreen({ navigation, route }) {
  const { idCurso } = route.params || {};
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');

  const loadCourse = useCallback(() => {
    setLoading(true);
    setError('');
    return Promise.all([getCourse(idCurso), getProgress()])
      .then(([courseData, progress]) => {
        setCourse(courseData);
        setEnrolled(
          progress.some((item) => Number(item.id_curso) === Number(idCurso))
        );
      })
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, [idCurso]);

  useFocusEffect(
    useCallback(() => {
      loadCourse();
    }, [loadCourse])
  );

  async function handleEnroll() {
    setEnrolling(true);
    setError('');

    try {
      await enrollInCourse(idCurso);
      setEnrolled(true);
    } catch (enrollError) {
      setError(enrollError.message);
    } finally {
      setEnrolling(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Navegação de Volta */}
        <View style={styles.headerNav}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <ArrowLeft color={theme.colors.white} size={20} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes do Curso</Text>
        </View>

        {loading ? <ActivityIndicator color={theme.colors.lime} /> : null}
        {error ? (
          <Text style={{ color: theme.colors.red, marginBottom: 12 }}>{error}</Text>
        ) : null}
        {course ? (
          <>
            <View style={styles.bannerCard}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{course.categoria || course.nivel}</Text>
              </View>
              <Text style={styles.courseTitle}>{course.nome}</Text>
              <Text style={styles.courseDesc}>{course.descricao}</Text>
              <TouchableOpacity
                style={styles.btnAccess}
                onPress={enrolled ? undefined : handleEnroll}
                disabled={enrolled || enrolling}
                activeOpacity={0.8}
              >
                {enrolling ? (
                  <ActivityIndicator color={theme.colors.background} />
                ) : (
                  <Text style={styles.btnAccessText}>
                    {enrolled ? 'Matriculado' : 'Matricular-se'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.sectionTitle}>Conteúdo do Curso</Text>
              {course.aulas.length === 0 ? (
                <Text style={{ color: theme.colors.muted }}>
                  Este curso ainda não tem aulas.
                </Text>
              ) : null}
              <View style={{ marginTop: 12 }}>
                {course.aulas.map((aula) => (
                  <TouchableOpacity
                    key={aula.id_aula}
                    style={styles.aulaCard}
                    onPress={() =>
                      navigation.navigate('Aula', {
                        aula,
                        cursoNome: course.nome,
                        idCurso,
                        matriculado: enrolled,
                      })
                    }
                    activeOpacity={0.8}
                  >
                    <View style={styles.aulaInfo}>
                      <Text style={styles.aulaNumber}>
                        {String(aula.numero_aula).padStart(2, '0')}
                      </Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.aulaTitle}>{aula.titulo}</Text>
                        <Text style={styles.aulaDuration}>
                          {aula.duracao_minutos} min
                        </Text>
                      </View>
                    </View>
                    {aula.video_url ? (
                      <PlayCircle color={theme.colors.lime} size={22} />
                    ) : (
                      <BookOpen color={theme.colors.muted} size={22} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : null}
        {!loading && !course && !error ? (
          <Text style={{ color: theme.colors.muted }}>Curso não encontrado.</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}