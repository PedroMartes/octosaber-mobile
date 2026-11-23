import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';
import { answerQuestion, getQuestions } from '../../services/api';

export default function QuestoesScreen() {
  const [question, setQuestion] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [result, setResult] = useState(null);
  const [startedAt, setStartedAt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadQuestion = useCallback(() => {
    return getQuestions(1)
      .then((questions) => {
        setQuestion(questions[0] || null);
        setSelectedId(null);
        setResult(null);
        setStartedAt(Date.now());
        setError(questions.length ? '' : 'Nenhuma questão está cadastrada.');
      })
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);

  async function handleAnswer() {
    if (result) {
      setQuestion(null);
      setLoading(true);
      await loadQuestion();
      return;
    }

    if (!question || !selectedId) return;

    setSaving(true);
    setError('');
    try {
      const response = await answerQuestion(
        question.id_questao,
        selectedId,
        Math.max(0, Math.round((Date.now() - startedAt) / 1000))
      );
      setResult(response);
    } catch (answerError) {
      setError(answerError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Prática de Questões</Text>
          <Text style={styles.subtitle}>Teste seus conhecimentos e ganhe XP</Text>
        </View>

        {loading && !question ? <ActivityIndicator color={theme.colors.lime} /> : null}
        {error ? <Text style={{ color: theme.colors.red }}>{error}</Text> : null}
        {!question && !loading ? (
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              loadQuestion();
            }}
          >
            <Text style={{ color: theme.colors.lime }}>Tentar novamente</Text>
          </TouchableOpacity>
        ) : null}

        {question ? (
          <View style={styles.card}>
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {question.disciplina || 'Questão'}
                </Text>
              </View>
              <Text style={styles.xpText}>+{question.xp || 0} XP</Text>
            </View>

            <Text style={styles.enunciado}>{question.enunciado}</Text>

            <View style={styles.optionsContainer}>
              {(question.alternativas || []).map((alternative) => {
                const isSelected =
                  String(selectedId) === String(alternative.id_alternativa);
                return (
                  <TouchableOpacity
                    key={alternative.id_alternativa}
                    style={[styles.optionButton, isSelected && styles.optionSelected]}
                    onPress={() => setSelectedId(alternative.id_alternativa)}
                    disabled={Boolean(result) || saving}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.optionLetter,
                        isSelected && styles.optionLetterSelected,
                      ]}
                    >
                      {alternative.letra}
                    </Text>
                    <Text style={styles.optionText}>{alternative.texto}</Text>
                    {isSelected ? (
                      <CheckCircle2 color={theme.colors.lime} size={18} />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>

            {result ? (
              <Text style={{ color: result.correta ? theme.colors.lime : theme.colors.gold }}>
                {result.correta
                  ? `Resposta correta! +${result.xp_ganho} XP`
                  : 'Resposta incorreta.'}
                {question.explicacao ? ` ${question.explicacao}` : ''}
              </Text>
            ) : null}

            <TouchableOpacity
              style={[
                styles.btnConfirmar,
                (!selectedId || saving) && styles.btnConfirmarDisabled,
              ]}
              disabled={!result && (!selectedId || saving)}
              onPress={handleAnswer}
              activeOpacity={0.8}
            >
              {saving ? (
                <ActivityIndicator color={theme.colors.background} />
              ) : (
                <Text style={styles.btnConfirmarText}>
                  {result ? 'Próxima questão' : 'Responder'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}