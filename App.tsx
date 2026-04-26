import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, LayoutDashboard, Target, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ProfileScreen from './screens/ProfileScreen';
// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Screens
import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import GoalsScreen from './screens/GoalsScreen';
import QRScreen from './screens/QRScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Your existing tab navigator moved into its own component
function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#ffffff', borderTopColor: '#e5e5e5', paddingBottom: insets.bottom, paddingTop: 5, height: insets.bottom + 45},
        tabBarIcon: ({ color }) => {
          if (route.name === 'Home') return <Home color={color} size={24} />;
          if (route.name === 'Stats') return <LayoutDashboard color={color} size={24} />;
          if (route.name === 'Goals') return <Target color={color} size={24} />;
          if (route.name === 'Profile') return <User color={color} size={24} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
// The core router that decides what to show
function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          {/* MainTabs holds your bottom navigation */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
          
          {/* QR Screen is now a standard stack screen that opens OVER the tabs */}
          <Stack.Screen 
            name="QR" 
            component={QRScreen} 
            options={{ presentation: 'modal' }} // Optional: Makes it slide up from the bottom like a nice modal!
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

// Wrap the whole app in the AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}