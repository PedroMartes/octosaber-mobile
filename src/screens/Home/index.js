import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { User, Flame, Zap, FileText, CheckSquare, BookOpen, Award } from 'lucide-react-native';
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
              <View style={styles.progressBarFill} />
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

            <TouchableOpacity style={styles.gridCard}>
              <FileText color={theme.colors.lime} size={24} />
              <Text style={styles.gridTitle}>Redação</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridCard}>
              <Award color={theme.colors.lime} size={24} />
              <Text style={styles.gridTitle}>Simulados</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}