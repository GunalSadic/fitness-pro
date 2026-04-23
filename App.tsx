import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, LayoutDashboard, QrCode, User } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import QRScreen from './screens/QRScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#000', // Primary color
          tabBarInactiveTintColor: '#888', // Muted foreground
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e5e5e5',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') return <Home color={color} size={24} />;
            if (route.name === 'Stats') return <LayoutDashboard color={color} size={24} />;
            if (route.name === 'QR') return <QrCode color={color} size={24} />;
            if (route.name === 'Profile') return <User color={color} size={24} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="QR" component={QRScreen} />
        {/* Profile Screen omitted for brevity, you can add it easily */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}