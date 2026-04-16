import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from './pages/HomeScreen';
import HistoryScreen from './pages/HistoryScreen';
import DetailScreen from './pages/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Membuat sub-route Stack untuk area History
function HistoryStack() {
  return (
    <Stack.Navigator>
      {/* Layer pertama di tab History adalah daftar absensi */}
      <Stack.Screen
        name="HistoryList"
        component={HistoryScreen}
        options={{ title: 'Riwayat Absensi' }}
      />
      {/* Layer kedua adalah detail (menumpuk di atas list) */}
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detail Informasi' }}
      />
    </Stack.Navigator>
  );
}

// Merangkai Tab Navigator utama
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'History') {
              iconName = 'history';
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={HistoryStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
