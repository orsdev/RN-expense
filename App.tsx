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

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
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
  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator
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
      </NavigationContainer>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
