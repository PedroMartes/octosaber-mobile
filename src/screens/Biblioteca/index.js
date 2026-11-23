import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Search, ArrowLeft } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';
import { getAssetUrl, getBooks } from '../../services/api';

export default function BibliotecaScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getBooks()
      .then((data) => {
        if (active) setBooks(data);
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

  const filteredBooks = useMemo(() => {
    const query = busca.trim().toLowerCase();
    if (!query) return books;

    return books.filter((book) =>
      [book.titulo, book.genero, book.autor]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [books, busca]);

  async function handleReadBook(book) {
    const url = getAssetUrl(book.url_externa);
    if (!url) {
      setError('Este livro ainda não possui um link de acesso.');
      return;
    }

    try {
      await Linking.openURL(url);
    } catch (openError) {
      setError(openError.message || 'Não foi possível abrir o livro.');
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.genero || 'Livro'}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.cardMeta}>
          {[item.autor, item.descricao].filter(Boolean).join(' • ')}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.readButton, !item.url_externa && { opacity: 0.5 }]}
        onPress={() => handleReadBook(item)}
        activeOpacity={0.8}
      >
        <Text style={styles.readButtonText}>Ler</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => String(item.id_livro)}
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
            {error ? (
              <Text style={{ color: theme.colors.red, marginBottom: 12 }}>{error}</Text>
            ) : null}
            {loading ? <ActivityIndicator color={theme.colors.lime} /> : null}
          </>
        }
        ListEmptyComponent={!loading ? (
          <Text style={styles.emptyText}>
            {error ? '' : 'Nenhum livro encontrado.'}
          </Text>
        ) : null}
      />
    </SafeAreaView>
  );
}