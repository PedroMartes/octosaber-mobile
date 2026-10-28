import React from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Download, ArrowLeft } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

const MATERIAIS_DADOS = [
  { id: '1', nome: 'Apostila de Matemática Básica', formato: 'PDF', tamanho: '4.5 MB', data: '20/10/2026' },
  { id: '2', nome: 'Slide Aula 04 - Química Orgânica', formato: 'PDF', tamanho: '12.1 MB', data: '22/10/2026' },
  { id: '3', nome: 'Lista de Exercícios - História do Brasil', formato: 'PDF', tamanho: '1.8 MB', data: '25/10/2026' },
  { id: '4', nome: 'Tabela Periódica Interativa e Esquema', formato: 'PDF', tamanho: '3.2 MB', data: '26/10/2026' },
];

export default function MateriaisScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.formato}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={styles.cardMeta}>{item.tamanho} • {item.data}</Text>
      </View>
      <TouchableOpacity style={styles.downloadButton} activeOpacity={0.8}>
        <Download color={theme.colors.background} size={16} />
        <Text style={styles.downloadButtonText}>Baixar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MATERIAIS_DADOS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation?.goBack()}
              activeOpacity={0.7}
            >
              <ArrowLeft color={theme.colors.white} size={20} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.title}>Materiais</Text>
              <Text style={styles.subtitle}>Baixe apostilas e PDFs complementares</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}