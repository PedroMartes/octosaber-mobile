import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Check, ArrowLeft } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

const METAS_INICIAIS = [
  { id: '1', disciplina: 'Matemática', assunto: 'Geometria Espacial', duracao: '45 min', concluida: true },
  { id: '2', disciplina: 'História', assunto: 'Revolução Industrial', duracao: '60 min', concluida: false },
  { id: '3', disciplina: 'Redação', assunto: 'Prática de Introdução', duracao: '30 min', concluida: false },
  { id: '4', disciplina: 'Física', assunto: 'Leis de Newton', duracao: '50 min', concluida: false },
];

export default function PlanoDeEstudosScreen({ navigation }) {
  const [metas, setMetas] = useState(METAS_INICIAIS);

  const alternarMeta = (id) => {
    setMetas((prevMetas) =>
      prevMetas.map((item) =>
        item.id === id ? { ...item, concluida: !item.concluida } : item
      )
    );
  };

  const concluidasCount = metas.filter((m) => m.concluida).length;
  const percentual = Math.round((concluidasCount / metas.length) * 100);

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.concluida && styles.cardCompleted]}>
      <View style={styles.cardInfo}>
        <Text style={styles.discipline}>{item.disciplina}</Text>
        <Text style={styles.subject}>{item.assunto}</Text>
        <Text style={styles.duration}>{item.duracao}</Text>
      </View>

      <TouchableOpacity
        style={[styles.checkbox, item.concluida && styles.checkboxActive]}
        onPress={() => alternarMeta(item.id)}
        activeOpacity={0.8}
      >
        {item.concluida && <Check color={theme.colors.background} size={18} strokeWidth={3} />}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={metas}
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
                <Text style={styles.title}>Plano de Estudos</Text>
                <Text style={styles.subtitle}>Sua rotina e metas diárias</Text>
              </View>
            </View>

            <View style={styles.progressCard}>
              <Text style={styles.progressTitle}>Progresso de Hoje</Text>
              <Text style={styles.progressSubtitle}>
                {concluidasCount} de {metas.length} tarefas concluídas ({percentual}%)
              </Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${percentual}%` }]} />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Metas Diárias</Text>
          </>
        }
      />
    </SafeAreaView>
  );
}