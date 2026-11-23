import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { School, User } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';
import { loginWithEmail, loginWithRA } from '../../services/api';

export default function LoginScreen({ navigation }) {
  const [tab, setTab] = useState('ra');
  const [ra, setRa] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    setLoading(true);
    setError('');

    try {
      if (tab === 'ra') {
        await loginWithRA(ra.trim(), senha);
      } else {
        await loginWithEmail(email.trim(), senha);
      }

      navigation.navigate('HomeTabs');
    } catch (loginError) {
      setError(loginError.message || 'Não foi possível fazer login.');
    } finally {
      setLoading(false);
    }
  }

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
            onPress={() => {
              setTab('ra');
              setError('');
            }}
            disabled={loading}
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
            onPress={() => {
              setTab('adult');
              setError('');
            }}
            disabled={loading}
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
              editable={!loading}
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              editable={!loading}
            />
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor={theme.colors.muted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              editable={!loading}
            />
          </View>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.btnPrimary, loading && styles.btnDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.background} />
          ) : (
            <Text style={styles.btnPrimaryText}>
              {tab === 'ra' ? 'Entrar com RA' : 'Continuar'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}