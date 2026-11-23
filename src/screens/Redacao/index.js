import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { ArrowLeft, Send, FileText } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';
import { getEssayTopics, submitEssay } from '../../services/api';

export default function RedacaoScreen({ navigation }) {
    const [texto, setTexto] = useState('');
    const [topics, setTopics] = useState([]);
    const [loadingTopics, setLoadingTopics] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        getEssayTopics()
            .then((data) => {
                if (active) setTopics(data);
            })
            .catch((loadError) => {
                if (active) setError(loadError.message);
            })
            .finally(() => {
                if (active) setLoadingTopics(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const palavrasCount = texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length;
    const topic = topics[0];

    async function handleSubmit() {
        if (palavrasCount < 10 || submitting || submitted) return;
        setSubmitting(true);
        setError('');
        try {
            await submitEssay({
                idTema: topic?.id_tema,
                titulo: topic?.titulo || 'Redação livre',
                texto,
            });
            setSubmitted(true);
        } catch (submitError) {
            setError(submitError.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Topo / Voltar */}
                <View style={styles.headerNav}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <ArrowLeft color={theme.colors.white} size={20} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Laboratório de Redação</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MinhasRedacoes')}
                        activeOpacity={0.8}
                    >
                        <FileText color={theme.colors.lime} size={22} />
                    </TouchableOpacity>
                </View>

                {/* Tema da Redação */}
                <View style={styles.promptCard}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {topic ? 'TEMA DISPONÍVEL' : 'TEMA LIVRE'}
                        </Text>
                    </View>
                    <Text style={promptTitleStyle}>
                        {loadingTopics
                            ? 'Carregando tema...'
                            : topic?.titulo || 'Escreva uma redação sobre um tema de sua escolha'}
                    </Text>
                    <Text style={styles.promptDesc}>
                        {topic?.descricao ||
                            topic?.proposta ||
                            'Elabore um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa.'}
                    </Text>
                    {loadingTopics ? <ActivityIndicator color={theme.colors.lime} /> : null}
                </View>

                {/* Área de Texto */}
                <View style={styles.editorSection}>
                    <View style={styles.editorHeader}>
                        <Text style={styles.label}>Sua Redação</Text>
                        <Text style={styles.counterText}>{palavrasCount} palavras</Text>
                    </View>

                    <TextInput
                        style={styles.textArea}
                        placeholder="Comece a escrever o seu texto aqui..."
                        placeholderTextColor={theme.colors.muted}
                        multiline
                        value={texto}
                        onChangeText={setTexto}
                    />
                </View>

                {/* Botão de Envio */}
                <TouchableOpacity
                    style={[
                        styles.btnSubmit,
                        (palavrasCount < 10 || submitting || submitted) &&
                            styles.btnSubmitDisabled,
                    ]}
                    disabled={palavrasCount < 10 || submitting || submitted}
                    onPress={handleSubmit}
                    activeOpacity={0.8}
                >
                    {submitting ? (
                        <ActivityIndicator color="#112000" />
                    ) : (
                        <Send color="#112000" size={18} />
                    )}
                    <Text style={styles.btnSubmitText}>
                        {submitted ? 'Redação enviada' : 'Enviar redação'}
                    </Text>
                </TouchableOpacity>
                {error ? <Text style={{ color: theme.colors.red }}>{error}</Text> : null}
                {submitted ? (
                    <Text style={{ color: theme.colors.lime }}>
                        Redação salva. Você pode acompanhar o envio em Minhas Redações.
                    </Text>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const promptTitleStyle = {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
};