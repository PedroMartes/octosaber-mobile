import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { BookOpen, Clock, PlayCircle } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

const mockCursos = [
    {
        id: '1',
        nome: 'Direito Constitucional',
        categoria: 'Direito',
        descricao: 'Aprenda os princípios fundamentais, direitos garantidos e a organização do Estado.',
        aulas: 12,
        duracao: '8h',
    },
    {
        id: '2',
        nome: 'Língua Portuguesa para Concursos',
        categoria: 'Geral',
        descricao: 'Domine gramática, interpretação de texto e regência para gabaritar a prova.',
        aulas: 20,
        duracao: '15h',
    },
    {
        id: '3',
        nome: 'Raciocínio Lógico e Matemática',
        categoria: 'Exatas',
        descricao: 'Resolução prática de proposições, equivalências e problemas matemáticos.',
        aulas: 15,
        duracao: '10h',
    },
];

export default function CursosScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View>
                    <Text style={styles.title}>Cursos</Text>
                    <Text style={styles.subtitle}>Explore os materiais preparados para sua aprovação</Text>
                </View>

                {mockCursos.map((curso) => (
                    <View key={curso.id} style={styles.courseCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{curso.categoria}</Text>
                            </View>
                        </View>

                        <Text style={styles.courseTitle}>{curso.nome}</Text>
                        <Text style={styles.courseDescription}>{curso.descricao}</Text>

                        <View style={styles.cardFooter}>
                            <View style={styles.infoItem}>
                                <BookOpen color={theme.colors.muted} size={16} />
                                <Text style={styles.infoText}>{curso.aulas} aulas</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Clock color={theme.colors.muted} size={16} />
                                <Text style={styles.infoText}>{curso.duracao}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.btnAccess}
                                onPress={() => navigation.navigate('CursoDetail')}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.btnAccessText}>Acessar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}