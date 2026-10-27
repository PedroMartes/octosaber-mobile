import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { School, User } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export default function LoginScreen({ navigation }) {
  const [tab, setTab] = useState('ra');
  const [ra, setRa] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>OS</Text>
          </View>
          <Text style={styles.brandTitle}>Octosaber</Text>
        </View>

        <Text style={styles.heroTitle}>Estude. Pratique. Conquiste.</Text>
        <Text style={styles.heroSubtitle}>
          Sua plataforma completa de preparação para concursos.
        </Text>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tabButton, tab === 'ra' && styles.tabActive]}
            onPress={() => setTab('ra')}
          >
            <School
              size={18}
              color={tab === 'ra' ? theme.colors.lime : theme.colors.muted}
            />
            <Text style={[styles.tabText, tab === 'ra' && styles.tabTextActive]}>
              Rede Pública
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, tab === 'adult' && styles.tabActive]}
            onPress={() => setTab('adult')}
          >
            <User
              size={18}
              color={tab === 'adult' ? theme.colors.lime : theme.colors.muted}
            />
            <Text style={[styles.tabText, tab === 'adult' && styles.tabTextActive]}>
              Assinante
            </Text>
          </TouchableOpacity>
        </View>

        {tab === 'ra' ? (
          <View style={styles.form}>
            <Text style={styles.label}>RA do Aluno</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu RA"
              placeholderTextColor={theme.colors.muted}
              value={ra}
              onChangeText={setRa}
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => navigation.navigate('HomeTabs')}
            >
              <Text style={styles.btnPrimaryText}>Entrar com RA</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor={theme.colors.muted}
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => navigation.navigate('HomeTabs')}
            >
              <Text style={styles.btnPrimaryText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}