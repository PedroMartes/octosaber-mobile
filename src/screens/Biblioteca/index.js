import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Search, ArrowLeft } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

const EBOOKS_DADOS = [
  { id: '1', titulo: 'Guia Definitivo do ENEM', categoria: 'E-book', autor: 'Prof. Carlos Silva', paginas: 120 },
  { id: '2', titulo: 'Fórmulas Essenciais de Física', categoria: 'Resumo', autor: 'Profa. Ana Costa', paginas: 15 },
  { id: '3', titulo: 'Manual de Redação Nota 1000', categoria: 'Guia', autor: 'Prof. Roberto Melo', paginas: 45 },
  { id: '4', titulo: 'Compêndio de Química Orgânica', categoria: 'E-book', autor: 'Profa. Juliana Lima', paginas: 88 },
];

export default function BibliotecaScreen({ navigation }) {
  const [busca, setBusca] = useState('');

  const livrosFiltrados = EBOOKS_DADOS.filter(
    (item) =>
      item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.categoria}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.cardMeta}>{item.autor} • {item.paginas} pág.</Text>
      </View>
      <TouchableOpacity style={styles.readButton} activeOpacity={0.8}>
        <Text style={styles.readButtonText}>Ler</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={livrosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation?.goBack()}
                activeOpacity={0.7}
              >
                <ArrowLeft color={theme.colors.white} size={20} />
              </TouchableOpacity>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.title}>Biblioteca</Text>
                <Text style={styles.subtitle}>Acesse e-books e resumos</Text>
              </View>
            </View>

            <View style={styles.searchContainer}>
              <Search color={theme.colors.muted} size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por título ou categoria..."
                placeholderTextColor={theme.colors.muted}
                value={busca}
                onChangeText={setBusca}
              />
            </View>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum material encontrado.</Text>
        }
      />
    </SafeAreaView>
  );
}