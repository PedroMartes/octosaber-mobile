import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { User, ShieldCheck, Award, Bell, LogOut, ChevronRight, BookOpen } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export default function PerfilScreen({ navigation }) {
  const handleLogout = () => {
    // Redireciona para a tela de Login e limpa o histórico de navegação
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Cabeçalho do Perfil */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User color={theme.colors.lime} size={40} />
          </View>
          <Text style={styles.userName}>Estudante Octosaber</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Rede Pública • RA: 202488102</Text>
          </View>
        </View>

        {/* Opções de Conta */}
        <View>
          <Text style={styles.sectionTitle}>Minha Aprenidagem</Text>
          <View style={styles.menuGroup}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Certificados')}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <Award color={theme.colors.lime} size={20} />
                <Text style={styles.menuItemText}>Meus Certificados</Text>
              </View>
              <ChevronRight color={theme.colors.muted} size={18} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <BookOpen color={theme.colors.lime} size={20} />
                <Text style={styles.menuItemText}>Histórico de Questões</Text>
              </View>
              <ChevronRight color={theme.colors.muted} size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Configurações */}
        <View>
          <Text style={styles.sectionTitle}>Configurações</Text>
          <View style={styles.menuGroup}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <Bell color={theme.colors.muted} size={20} />
                <Text style={styles.menuItemText}>Notificações</Text>
              </View>
              <ChevronRight color={theme.colors.muted} size={18} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <ShieldCheck color={theme.colors.muted} size={20} />
                <Text style={styles.menuItemText}>Privacidade e Segurança</Text>
              </View>
              <ChevronRight color={theme.colors.muted} size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout} activeOpacity={0.8}>
          <LogOut color={theme.colors.red} size={18} />
          <Text style={styles.btnLogoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}