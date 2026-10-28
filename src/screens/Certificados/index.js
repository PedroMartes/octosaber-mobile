import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Award, Download, Clock } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

const mockCertificados = [
    {
        id: '1',
        curso: 'Direito Constitucional Fundamental',
        cargaHoraria: '40 horas',
        dataEmissao: '12 Out 2026',
        status: 'emitido',
    },
    {
        id: '2',
        curso: 'Língua Portuguesa para Concursos',
        cargaHoraria: '60 horas',
        dataEmissao: '05 Set 2026',
        status: 'emitido',
    },
    {
        id: '3',
        curso: 'Raciocínio Lógico e Matemática',
        cargaHoraria: '50 horas',
        progresso: '75%',
        status: 'em_andamento',
    },
];

export default function CertificadosScreen({ navigation }) {
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
                    <Text style={styles.headerTitle}>Meus Certificados</Text>
                </View>

                <Text style={styles.subtitle}>
                    Visualize e faça download das suas conquistas acadêmicas
                </Text>

                {mockCertificados.map((item) => {
                    const isIssued = item.status === 'emitido';
                    return (
                        <View key={item.id} style={styles.certCard}>
                            <View style={styles.cardHeader}>
                                <Award color={isIssued ? theme.colors.lime : theme.colors.muted} size={24} />
                                <View
                                    style={[
                                        styles.badge,
                                        isIssued ? styles.badgeIssued : styles.badgeProgress,
                                    ]}
                                >
                                    <Text
                                        style={
                                            isIssued ? styles.badgeTextIssued : styles.badgeTextProgress
                                        }
                                    >
                                        {isIssued ? 'DISPONÍVEL' : 'EM ANDAMENTO'}
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <Text style={styles.certTitle}>{item.curso}</Text>
                                <Text style={styles.certMeta}>
                                    Carga Horária: {item.cargaHoraria}
                                </Text>
                            </View>

                            <View style={styles.cardFooter}>
                                {isIssued ? (
                                    <>
                                        <Text style={styles.certMeta}>Emitido em: {item.dataEmissao}</Text>
                                        <TouchableOpacity style={styles.btnDownload} activeOpacity={0.8}>
                                            <Download color="#112000" size={16} />
                                            <Text style={styles.btnDownloadText}>Download PDF</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <Clock color={theme.colors.muted} size={16} />
                                            <Text style={styles.certMeta}>Conclusão pendente</Text>
                                        </View>
                                        <Text style={styles.progressText}>{item.progresso} concluído</Text>
                                    </>
                                )}
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}