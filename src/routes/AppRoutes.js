import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import CursoDetailScreen from '../screens/CursoDetail';
import TabRoutes from './TabRoutes';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeTabs" component={TabRoutes} />
      <Stack.Screen name="CursoDetail" component={CursoDetailScreen} />
    </Stack.Navigator>
  );
}