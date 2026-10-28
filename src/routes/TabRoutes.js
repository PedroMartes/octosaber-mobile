import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BookOpen, CheckSquare, User } from 'lucide-react-native';

import { theme } from '../styles/theme';

// Importação das suas telas
import HomeScreen from '../screens/Home';
import CursosScreen from '../screens/Cursos';
import QuestoesScreen from '../screens/Questoes';
import PerfilScreen from '../screens/Perfil';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Oculta o cabeçalho padrão do React Navigation
        tabBarStyle: {
          backgroundColor: theme.colors.navy, // Cor de fundo da barra
          borderTopColor: theme.colors.line, // Cor da borda superior
          borderTopWidth: 1,
          height: 80, // Altura da barra
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.lime, // Cor do ícone e texto ativo
        tabBarInactiveTintColor: theme.colors.muted, // Cor do ícone e texto inativo
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Cursos"
        component={CursosScreen}
        options={{
          tabBarLabel: 'Cursos',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Questoes"
        component={QuestoesScreen}
        options={{
          tabBarLabel: 'Questões',
          tabBarIcon: ({ color, size }) => <CheckSquare color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}