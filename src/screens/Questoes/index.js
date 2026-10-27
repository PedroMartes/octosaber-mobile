import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

const questaoExemplo = {
  id: '1',
  disciplina: 'Direito Constitucional',
  xp: 50,
  enunciado: 'Segundo a Constituição Federal de 1988, todos são iguais perante a lei, sem distinção de qualquer natureza. Qual das opções representa um direito fundamental expresso no Artigo 5º?',
  alternativas: [
    { id: 'a', letra: 'A', texto: 'Inviolabilidade do direito à vida e à liberdade' },
    { id: 'b', letra: 'B', texto: 'Livre acesso a cargos públicos sem concurso' },
    { id: 'c', letra: 'C', texto: 'Isenção total de impostos individuais' },
    { id: 'd', letra: 'D', texto: 'Obrigatoriedade de filiação partidária' },
  ],
};

export default function QuestoesScreen() {
  const [selecionada, setSelecionada] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Prática de Questões</Text>
          <Text style={styles.subtitle}>Testa os teus conhecimentos e ganha XP</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{questaoExemplo.disciplina}</Text>
            </View>
            <Text style={styles.xpText}>+{questaoExemplo.xp} XP</Text>
          </View>

          <Text style={styles.enunciado}>{questaoExemplo.enunciado}</Text>

          <View style={styles.optionsContainer}>
            {questaoExemplo.alternativas.map((alt) => {
              const isSelected = selecionada === alt.id;
              return (
                <TouchableOpacity
                  key={alt.id}
                  style={[styles.optionButton, isSelected && styles.optionSelected]}
                  onPress={() => setSelecionada(alt.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.optionLetter, isSelected && styles.optionLetterSelected]}>
                    {alt.letra}
                  </Text>
                  <Text style={styles.optionText}>{alt.texto}</Text>
                  {isSelected && <CheckCircle2 color={theme.colors.lime} size={18} />}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={[styles.btnConfirmar, !selecionada && styles.btnConfirmarDisabled]}
            disabled={!selecionada}
            activeOpacity={0.8}
          >
            <Text style={styles.btnConfirmarText}>Responder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}