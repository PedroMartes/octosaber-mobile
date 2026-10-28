import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Clock, FileText } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

const mockSimulados = [
    {
        id: '1',
        titulo: 'Simulado Geral - Polícia Civil 2026',
        banca: 'VUNESP',
        questoes: 80,
        tempo: '4h 00m',
    },
    {
        id: '2',
        titulo: 'Simulado Raciocínio Lógico e Português',
        banca: 'Cebraspe',
        questoes: 50,
        tempo: '2h 30m',
    },
    {
        id: '3',
        titulo: 'Simulado Direito Administrativo & Constitucional',
        banca: 'FGV',
        questoes: 40,
        tempo: '2h 00m',
    },
];

export default function SimuladosScreen({ navigation }) {
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
                    <Text style={styles.headerTitle}>Simulados</Text>
                </View>

                <Text style={styles.subtitle}>
                    Teste o seu ritmo de prova com cronômetro e ambiente de exame
                </Text>

                {mockSimulados.map((item) => (
                    <View key={item.id} style={styles.simuladoCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{item.banca}</Text>
                            </View>
                        </View>

                        <Text style={styles.simuladoTitle}>{item.titulo}</Text>

                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <FileText color={theme.colors.muted} size={16} />
                                <Text style={styles.infoText}>{item.questoes} questões</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Clock color={theme.colors.muted} size={16} />
                                <Text style={styles.infoText}>{item.tempo}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.btnStart}
                            onPress={() => navigation.navigate('ResultadoSimulado')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.btnStartText}>Iniciar Simulado</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}