import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, PlayCircle, CheckCircle } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

const mockAulas = [
  { id: '1', numero: '01', titulo: 'Princípios Fundamentais', duracao: '25 min', concluida: true },
  { id: '2', numero: '02', titulo: 'Direitos e Garantias Fundamentais', duracao: '32 min', concluida: true },
  { id: '3', numero: '03', titulo: 'Nacionalidade e Direitos Políticos', duracao: '40 min', concluida: false },
  { id: '4', numero: '04', titulo: 'Organização do Estado', duracao: '28 min', concluida: false },
];

export default function CursoDetailScreen({ navigation }) {
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

        {/* Banner do Curso */}
        <View style={styles.bannerCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Direito</Text>
          </View>
          <Text style={styles.courseTitle}>Direito Constitucional</Text>
          <Text style={styles.courseDesc}>
            Aprenda os princípios fundamentais, direitos garantidos e a organização do Estado com foco em bancas organizadoras.
          </Text>
        </View>

        {/* Lista de Aulas */}
        <View>
          <Text style={styles.sectionTitle}>Conteúdo do Curso</Text>
          <View style={{ marginTop: 12 }}>
            {mockAulas.map((aula) => (
              <TouchableOpacity key={aula.id} style={styles.aulaCard} activeOpacity={0.8}>
                <View style={styles.aulaInfo}>
                  <Text style={styles.aulaNumber}>{aula.numero}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.aulaTitle}>{aula.titulo}</Text>
                    <Text style={styles.aulaDuration}>{aula.duracao}</Text>
                  </View>
                </View>

                {aula.concluida ? (
                  <CheckCircle color={theme.colors.lime} size={22} />
                ) : (
                  <PlayCircle color={theme.colors.muted} size={22} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}