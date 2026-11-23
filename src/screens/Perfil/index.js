import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  User,
  Award,
  Bell,
  LogOut,
  ChevronRight,
  BookOpen,
  Calendar,
} from 'lucide-react-native';
import {
  getCurrentUser,
  getNotifications,
  logout,
  markNotificationRead,
} from '../../services/api';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export default function PerfilScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsLoaded, setNotificationsLoaded] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsError, setNotificationsError] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((data) => {
        if (active) setUser(data);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function loadNotifications() {
    setNotificationsLoading(true);
    setNotificationsError('');
    try {
      const data = await getNotifications();
      setNotifications(data);
      setNotificationsLoaded(true);
    } catch (loadError) {
      setNotificationsError(loadError.message);
    } finally {
      setNotificationsLoading(false);
    }
  }

  function toggleNotifications() {
    const shouldLoad = !notificationsOpen && !notificationsLoaded;
    setNotificationsOpen((open) => !open);
    if (shouldLoad) loadNotifications();
  }

  async function readNotification(notification) {
    if (Number(notification.lida) === 1) return;
    setError('');
    try {
      await markNotificationRead(notification.id_notificacao);
      setNotifications((current) =>
        current.map((item) =>
          item.id_notificacao === notification.id_notificacao
            ? { ...item, lida: 1 }
            : item
        )
      );
    } catch (readError) {
      setError(readError.message);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    setError('');
    try {
      await logout();
      const rootNavigation = navigation.getParent();
      if (rootNavigation) {
        rootNavigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      } else {
        navigation.navigate('Login');
      }
    } catch (logoutError) {
      setError(logoutError.message);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User color={theme.colors.lime} size={40} />
          </View>
          <Text style={styles.userName}>
            {loading ? 'Carregando...' : user?.nome || 'Usuário'}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {user?.perfil || 'Conta'}
              {user?.ra ? ` • RA: ${user.ra}` : ''}
            </Text>
          </View>
        </View>

        {loading ? <ActivityIndicator color={theme.colors.lime} /> : null}
        {error ? <Text style={{ color: theme.colors.red }}>{error}</Text> : null}

        <View>
          <Text style={styles.sectionTitle}>Minha aprendizagem</Text>
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

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navigation.navigate('HomeTabs', { screen: 'Questoes' })
              }
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <BookOpen color={theme.colors.lime} size={20} />
                <Text style={styles.menuItemText}>Praticar Questões</Text>
              </View>
              <ChevronRight color={theme.colors.muted} size={18} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, { borderBottomWidth: 0 }]}
              onPress={() => navigation.navigate('PlanoDeEstudos')}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <Calendar color={theme.colors.lime} size={20} />
                <Text style={styles.menuItemText}>Plano de Estudos</Text>
              </View>
              <ChevronRight color={theme.colors.muted} size={18} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <View style={styles.menuGroup}>
            <TouchableOpacity
              style={[styles.menuItem, { borderBottomWidth: 0 }]}
              onPress={toggleNotifications}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <Bell color={theme.colors.muted} size={20} />
                <Text style={styles.menuItemText}>Ver notificações</Text>
              </View>
              <ChevronRight color={theme.colors.muted} size={18} />
            </TouchableOpacity>
          </View>
          {notificationsOpen ? (
            <View style={[styles.menuGroup, { marginTop: 8 }]}>
              {notificationsLoading ? (
                <ActivityIndicator
                  color={theme.colors.lime}
                  style={{ padding: 16 }}
                />
              ) : notificationsError ? (
                <View style={{ padding: 16, gap: 8 }}>
                  <Text style={{ color: theme.colors.red }}>
                    {notificationsError}
                  </Text>
                  <TouchableOpacity onPress={loadNotifications}>
                    <Text style={{ color: theme.colors.lime }}>Tentar novamente</Text>
                  </TouchableOpacity>
                </View>
              ) : notifications.length ? (
                notifications.map((notification) => (
                  <TouchableOpacity
                    key={notification.id_notificacao}
                    style={styles.menuItem}
                    onPress={() => readNotification(notification)}
                    activeOpacity={0.8}
                  >
                    <View style={{ flex: 1, gap: 4 }}>
                      <Text style={styles.menuItemText}>
                        {notification.titulo}
                        {Number(notification.lida) === 1 ? '' : ' • Nova'}
                      </Text>
                      <Text style={{ color: theme.colors.muted }}>
                        {notification.mensagem}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={[styles.menuItemText, { padding: 16 }]}>
                  Nenhuma notificação disponível.
                </Text>
              )}
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.btnLogout}
          onPress={handleLogout}
          disabled={loggingOut}
          activeOpacity={0.8}
        >
          {loggingOut ? (
            <ActivityIndicator color={theme.colors.red} />
          ) : (
            <LogOut color={theme.colors.red} size={18} />
          )}
          <Text style={styles.btnLogoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
