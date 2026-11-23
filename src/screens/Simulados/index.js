import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ArrowLeft, CheckCircle2, Clock3, ListChecks } from 'lucide-react-native';
import {
  answerQuestion,
  getDisciplines,
  getQuestions,
} from '../../services/api';
import { theme } from '../../styles/theme';
import { styles } from './styles';

const QUESTION_LIMIT = 5;

export default function SimuladosScreen({ navigation }) {
  const [disciplines, setDisciplines] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [loadingDisciplines, setLoadingDisciplines] = useState(true);
  const [disciplineError, setDisciplineError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [startedAt, setStartedAt] = useState(0);
  const [questionStartedAt, setQuestionStartedAt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const currentQuestion = questions[currentIndex];
  const selectedDisciplineInfo = disciplines.find(
    (discipline) =>
      String(discipline.id_disciplina) === String(selectedDiscipline)
  );
  const selectedQuestionCount = selectedDisciplineInfo
    ? Math.min(
        Number(selectedDisciplineInfo.quantidade_questoes) || 0,
        QUESTION_LIMIT
      )
    : QUESTION_LIMIT;
  const selectedQuestionCountLabel = `${selectedQuestionCount} ${
    selectedQuestionCount === 1 ? 'questão' : 'questões'
  }`;

  const loadDisciplines = useCallback(() => {
    return getDisciplines()
      .then(setDisciplines)
      .catch((loadError) => setDisciplineError(loadError.message))
      .finally(() => setLoadingDisciplines(false));
  }, []);

  useEffect(() => {
    loadDisciplines();
  }, [loadDisciplines]);

  async function startSimulation() {
    setLoading(true);
    setError('');
    try {
      const availableQuestions = await getQuestions(
        QUESTION_LIMIT,
        selectedDiscipline
      );
      if (!availableQuestions.length) {
        setError(
          selectedDiscipline
            ? 'Nenhuma questão disponível para esta matéria.'
            : 'Nenhuma questão está cadastrada para este simulado.'
        );
        return;
      }

      setQuestions(availableQuestions);
      setCurrentIndex(0);
      setSelectedId(null);
      setAnswers([]);
      setStartedAt(Date.now());
      setQuestionStartedAt(Date.now());
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer() {
    if (!currentQuestion || !selectedId || saving) return;

    setSaving(true);
    setError('');
    try {
      const response = await answerQuestion(
        currentQuestion.id_questao,
        selectedId,
        Math.max(0, Math.round((Date.now() - questionStartedAt) / 1000))
      );
      const updatedAnswers = [
        ...answers,
        {
          disciplina: currentQuestion.disciplina || 'Geral',
          correta: response.correta,
          xp: Number(response.xp_ganho) || 0,
        },
      ];

      if (currentIndex + 1 >= questions.length) {
        const byDiscipline = updatedAnswers.reduce((summary, answer) => {
          if (!summary[answer.disciplina]) {
            summary[answer.disciplina] = { total: 0, correct: 0 };
          }
          summary[answer.disciplina].total += 1;
          if (answer.correta) summary[answer.disciplina].correct += 1;
          return summary;
        }, {});
        const correct = updatedAnswers.filter((answer) => answer.correta).length;

        navigation.navigate('ResultadoSimulado', {
          result: {
            total: updatedAnswers.length,
            correct,
            xp: updatedAnswers.reduce((total, answer) => total + answer.xp, 0),
            elapsedSeconds: Math.max(
              0,
              Math.round((Date.now() - startedAt) / 1000)
            ),
            byDiscipline: Object.entries(byDiscipline).map(
              ([disciplina, score]) => ({ disciplina, ...score })
            ),
          },
        });
        return;
      }

      setAnswers(updatedAnswers);
      setCurrentIndex((index) => index + 1);
      setSelectedId(null);
      setQuestionStartedAt(Date.now());
    } catch (answerError) {
      setError(answerError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerNav}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <ArrowLeft color={theme.colors.white} size={20} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Simulados</Text>
        </View>

        <Text style={styles.subtitle}>
          Pratique com questões cadastradas e acompanhe seu resultado.
        </Text>

        {error ? <Text style={{ color: theme.colors.red }}>{error}</Text> : null}

        {!currentQuestion ? (
          <View style={styles.simuladoCard}>
            <Text style={styles.selectionTitle}>Escolha a matéria</Text>
            {loadingDisciplines ? (
              <ActivityIndicator color={theme.colors.lime} />
            ) : null}
            {disciplineError ? (
              <View>
                <Text style={{ color: theme.colors.red }}>{disciplineError}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setLoadingDisciplines(true);
                    setDisciplineError('');
                    loadDisciplines();
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.retryText}>Tentar carregar matérias novamente</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {!loadingDisciplines && !disciplineError ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.disciplineOptions}
              >
                <TouchableOpacity
                  style={[
                    styles.disciplineChip,
                    selectedDiscipline === null && styles.disciplineChipSelected,
                  ]}
                  onPress={() => setSelectedDiscipline(null)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.disciplineChipText,
                      selectedDiscipline === null && styles.disciplineChipTextSelected,
                    ]}
                  >
                    Todas
                  </Text>
                </TouchableOpacity>
                {disciplines.map((discipline) => {
                  const isSelected =
                    String(selectedDiscipline) === String(discipline.id_disciplina);
                  return (
                    <TouchableOpacity
                      key={discipline.id_disciplina}
                      style={[
                        styles.disciplineChip,
                        isSelected && styles.disciplineChipSelected,
                      ]}
                      onPress={() =>
                        setSelectedDiscipline(discipline.id_disciplina)
                      }
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.disciplineChipText,
                          isSelected && styles.disciplineChipTextSelected,
                        ]}
                      >
                        {discipline.nome} ({discipline.quantidade_questoes})
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : null}
            <Text style={styles.infoText}>
              O simulado terá até {QUESTION_LIMIT} questões da matéria escolhida.
            </Text>
            <View style={styles.cardHeader}>
              <Text style={styles.simuladoTitle}>Simulado rápido</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>QUESTÕES DA API</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <ListChecks color={theme.colors.muted} size={16} />
                <Text style={styles.infoText}>
                  {selectedDisciplineInfo
                    ? selectedQuestionCountLabel
                    : `Até ${QUESTION_LIMIT} questões`}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Clock3 color={theme.colors.muted} size={16} />
                <Text style={styles.infoText}>Sem limite de tempo</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnStart}
              onPress={startSimulation}
              disabled={loading || loadingDisciplines || Boolean(disciplineError)}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={theme.colors.background} />
              ) : (
                <Text style={styles.btnStartText}>Começar</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.simuladoCard}>
            <View style={styles.cardHeader}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  QUESTÃO {currentIndex + 1} DE {questions.length}
                </Text>
              </View>
              <Text style={styles.infoText}>
                {currentQuestion.disciplina || 'Geral'}
              </Text>
            </View>

            <Text style={styles.simuladoTitle}>{currentQuestion.enunciado}</Text>

            {(currentQuestion.alternativas || []).map((alternative) => {
              const isSelected =
                String(selectedId) === String(alternative.id_alternativa);
              return (
                <TouchableOpacity
                  key={alternative.id_alternativa}
                  style={[
                    styles.simuladoCard,
                    { padding: 12, flexDirection: 'row', alignItems: 'center' },
                    isSelected && { borderColor: theme.colors.lime },
                  ]}
                  onPress={() => setSelectedId(alternative.id_alternativa)}
                  disabled={saving}
                  activeOpacity={0.8}
                >
                  <Text style={styles.badgeText}>{alternative.letra}</Text>
                  <Text style={[styles.infoText, { flex: 1 }]}>
                    {alternative.texto}
                  </Text>
                  {isSelected ? (
                    <CheckCircle2 color={theme.colors.lime} size={18} />
                  ) : null}
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={[styles.btnStart, !selectedId && { opacity: 0.5 }]}
              onPress={submitAnswer}
              disabled={!selectedId || saving}
              activeOpacity={0.8}
            >
              {saving ? (
                <ActivityIndicator color={theme.colors.background} />
              ) : (
                <Text style={styles.btnStartText}>
                  {currentIndex + 1 === questions.length
                    ? 'Finalizar simulado'
                    : 'Próxima questão'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
