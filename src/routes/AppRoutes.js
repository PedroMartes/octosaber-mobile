import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import CursoDetailScreen from '../screens/CursoDetail';
import AulaScreen from '../screens/Aula';
import RedacaoScreen from '../screens/Redacao';
import SimuladosScreen from '../screens/Simulados';
import ResultadoSimuladoScreen from '../screens/ResultadoSimulado';
import MinhasRedacoesScreen from '../screens/MinhasRedacoes';
import CertificadosScreen from '../screens/Certificados';
import BibliotecaScreen from '../screens/Biblioteca';
import MateriaisScreen from '../screens/Materiais';
import PlanoDeEstudos from '../screens/PlanoDeEstudos';
import TabRoutes from './TabRoutes';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeTabs" component={TabRoutes} />
      <Stack.Screen name="CursoDetail" component={CursoDetailScreen} />
      <Stack.Screen name="Aula" component={AulaScreen} />
      <Stack.Screen name="Redacao" component={RedacaoScreen} />
      <Stack.Screen name="Simulados" component={SimuladosScreen} />
      <Stack.Screen name="ResultadoSimulado" component={ResultadoSimuladoScreen} />
      <Stack.Screen name="MinhasRedacoes" component={MinhasRedacoesScreen} />
      <Stack.Screen name="Certificados" component={CertificadosScreen} />
      <Stack.Screen name="Biblioteca" component={BibliotecaScreen} />
      <Stack.Screen name="Materiais" component={MateriaisScreen} />
      <Stack.Screen name="PlanoDeEstudos" component={PlanoDeEstudos} />
    </Stack.Navigator>
  );
}