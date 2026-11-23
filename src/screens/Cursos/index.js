import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { BookOpen, Clock } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';
import { getCourses } from '../../services/api';

export default function CursosScreen({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCourses = useCallback(() => {
    return getCourses()
      .then(setCourses)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.title}>Cursos</Text>
          <Text style={styles.subtitle}>Explore os materiais preparados para sua aprovação</Text>
        </View>

        {loading ? <ActivityIndicator color={theme.colors.lime} /> : null}
        {error ? (
          <View>
            <Text style={{ color: theme.colors.red, marginBottom: 8 }}>{error}</Text>
            <TouchableOpacity
              onPress={() => {
                setError('');
                setLoading(true);
                loadCourses();
              }}
            >
              <Text style={{ color: theme.colors.lime }}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {!loading && !error && courses.length === 0 ? (
          <Text style={styles.subtitle}>Nenhum curso disponível no momento.</Text>
        ) : null}

        {courses.map((curso) => (
          <View key={curso.id_curso} style={styles.courseCard}>
            <View style={styles.cardHeader}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{curso.categoria || 'Curso'}</Text>
              </View>
            </View>

            <Text style={styles.courseTitle}>{curso.nome}</Text>
            <Text style={styles.courseDescription}>
              {curso.descricao || 'Confira o conteúdo deste curso.'}
            </Text>

            <View style={styles.cardFooter}>
              <View style={styles.infoItem}>
                <BookOpen color={theme.colors.muted} size={16} />
                <Text style={styles.infoText}>{curso.quantidade_aulas} aulas</Text>
              </View>

              <View style={styles.infoItem}>
                <Clock color={theme.colors.muted} size={16} />
                <Text style={styles.infoText}>{curso.nivel || 'Todos os níveis'}</Text>
              </View>

              <TouchableOpacity
                style={styles.btnAccess}
                onPress={() =>
                  navigation.navigate('CursoDetail', { idCurso: curso.id_curso })
                }
                activeOpacity={0.8}
              >
                <Text style={styles.btnAccessText}>Acessar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}