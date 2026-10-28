import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import {
  ArrowLeft,
  Play,
  CheckCircle,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export default function AulaScreen({ navigation }) {
  const [concluida, setConcluida] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Topo / Voltar */}
      <View style={styles.headerNav}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <ArrowLeft color={theme.colors.white} size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Aula 01 • Princípios Fundamentais
        </Text>
      </View>

      <ScrollView>
        {/* Árvore/Área de Vídeo */}
        <View style={styles.videoArea}>
          <TouchableOpacity style={styles.playIconContainer} activeOpacity={0.8}>
            <Play color="#112000" size={28} fill="#112000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Informações da Aula */}
          <View style={styles.lessonHeader}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Direito Constitucional</Text>
            </View>
            <Text style={styles.lessonTitle}>Princípios Fundamentais</Text>
            <Text style={styles.lessonDesc}>
              Nesta aula abordamos a estrutura inicial da CF/88, princípios expressos e implícitos.
            </Text>
          </View>

          {/* Marcar Concluída */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.btnComplete, concluida && styles.btnCompleteActive]}
              onPress={() => setConcluida(!concluida)}
              activeOpacity={0.8}
            >
              <CheckCircle
                color={concluida ? '#112000' : theme.colors.lime}
                size={18}
              />
              <Text
                style={[
                  styles.btnCompleteText,
                  concluida && styles.btnCompleteTextActive,
                ]}
              >
                {concluida ? 'Aula Concluída' : 'Marcar como Concluída'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Material Complementar */}
          <View style={{ gap: 10 }}>
            <Text style={styles.sectionTitle}>Material de Apoio</Text>
            <TouchableOpacity style={styles.materialCard} activeOpacity={0.8}>
              <View style={styles.materialInfo}>
                <FileText color={theme.colors.lime} size={20} />
                <View>
                  <Text style={styles.materialTitle}>Apostila em PDF</Text>
                  <Text style={styles.materialSub}>Resumo em 12 páginas • 2.4 MB</Text>
                </View>
              </View>
              <Download color={theme.colors.muted} size={18} />
            </TouchableOpacity>
          </View>

          {/* Navegação entre Aulas */}
          <View style={styles.footerNav}>
            <TouchableOpacity style={styles.navButton} activeOpacity={0.8}>
              <ChevronLeft color={theme.colors.white} size={16} />
              <Text style={styles.navButtonText}>Anterior</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} activeOpacity={0.8}>
              <Text style={styles.navButtonText}>Próxima Aula</Text>
              <ChevronRight color={theme.colors.white} size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}