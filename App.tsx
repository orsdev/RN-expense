import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpensePage from './screens/Recent';
import AllExpensePage from './screens/All';
import ManageExpensePage from './screens/Manage';
import { COLORS } from './constants/colors.conts';
import { Ionicons } from '@expo/vector-icons';
import LoginPage from './screens/Login';
import RegisterPage from './screens/Register';
import { useAuthStore } from './store';
import * as SplashScreen from 'expo-splash-screen';
import { deleteFromSecureStore, getFromSecureStore } from './utils/secureStore';
import { useCallback, useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      initialRouteName='LoginPage'
      screenOptions={{
        title: '',
        headerTitleStyle: {
          fontSize: 16
        },
        headerStyle: {
          backgroundColor: 'white',
        },
        // headerTintColor: 'red',
        contentStyle: {} //TODO: Applies to main content

      }}>
      <Stack.Screen
        name="ExpenseOverview"
        component={ExpensesOverview}
        options={{
          headerShown: false,
          title: '',
          headerStyle: {
            backgroundColor: 'white',
          },
          // headerTintColor: 'red',
          contentStyle: {} //TODO: Applies to main content
        }}
      />
      <Stack.Screen
        name="ManageExpense"
        // @ts-ignore
        component={ManageExpensePage}
        options={{
          presentation: 'modal'
        }}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName='LoginPage'
      screenOptions={{
        title: '',
        headerTitleStyle: {
          fontSize: 16
        },
        headerStyle: {
          backgroundColor: 'white',
        },
        // headerTintColor: 'red',
        contentStyle: {} //TODO: Applies to main content

      }}>
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
      />
      <Stack.Screen
        name="RegisterPage"
        component={RegisterPage}
      />
    </Stack.Navigator>
  );
}

const ExpensesOverview = () => {
  const { logOut } = useAuthStore();

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleStyle: {
          color: '#fff'
        },
        headerStyle: {
          backgroundColor: COLORS.primary
        },
        tabBarStyle: {
          backgroundColor: COLORS.primary,
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.bg,
        headerLeft: () => {
          return (
            <Pressable
              onPress={() => {
                logOut();
                deleteFromSecureStore('token')
              }}
              style={{
                marginHorizontal: 10
              }}>
              <Ionicons name="log-out" size={25} color="#fff" />
            </Pressable>
          )
        },
        headerRight: () => {
          return (
            <Pressable
              onPress={() => navigation.navigate('ManageExpense')}
              style={{
                marginHorizontal: 10
              }}>
              <Ionicons name="add" size={25} color="#fff" />
            </Pressable>
          )
        }
      })}>
      <BottomTabs.Screen
        name="RecentExpenses"
        options={{
          title: 'Recent',
          tabBarIcon: (({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ))
        }}
        component={RecentExpensePage}
      />
      <BottomTabs.Screen
        name="AllExpense"
        options={{
          title: 'All Expenses',
          tabBarIcon: (({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ))
        }}
        component={AllExpensePage} />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { token, setToken } = useAuthStore();
  const isAuthenticated = !!token;

  useEffect(() => {
    async function fetchToken() {
      const token = await getFromSecureStore('token') as string;

      if (token as string) {
        setToken(token)
      };

      await SplashScreen.hideAsync();
      setAppIsReady(true)
    }

    fetchToken()
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        {appIsReady && isAuthenticated && <AuthenticatedStack />}
        {appIsReady && !isAuthenticated && <AuthStack />}
      </NavigationContainer>
    </>

  );
}

const styles = StyleSheet.create({
  container: {},
});
