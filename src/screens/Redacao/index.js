import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { ArrowLeft, Send, FileText } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export default function RedacaoScreen({ navigation }) {
    const [texto, setTexto] = useState('');

    // Contagem simples de palavras
    const palavrasCount = texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length;

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
                        <Text style={styles.badgeText}>TEMA DA SEMANA</Text>
                    </View>
                    <Text style={promptTitleStyle}>
                        O impacto da inteligência artificial na segurança pública e no mercado de trabalho
                    </Text>
                    <Text style={styles.promptDesc}>
                        Com base nos conhecimentos construídos, elabore um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa.
                    </Text>
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
                    style={[styles.btnSubmit, palavrasCount < 10 && styles.btnSubmitDisabled]}
                    disabled={palavrasCount < 10}
                    activeOpacity={0.8}
                >
                    <Send color="#112000" size={18} />
                    <Text style={styles.btnSubmitText}>Enviar para Correção</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const promptTitleStyle = {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
};