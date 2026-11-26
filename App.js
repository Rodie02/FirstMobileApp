// App.js
// ADVANCED NAVIGATION: Bottom Tabs (main sections) nested inside a Stack
// (screens that open on top of the tabs).
//
//   Stack (root)
//   ├── MainTabs (Bottom Tab Navigator)
//   │     ├── Home      dashboard + shortcuts
//   │     ├── Quizzes   list of quizzes (take / edit / delete)
//   │     ├── Create    quiz maker (create + edit)
//   │     └── History   list of submitted attempts
//   ├── Answer   (param: quizId)     opens over the tabs
//   └── Results  (param: attemptId)  opens over the tabs

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, Alert, Text, View } from "react-native";

import { QuizProvider, useQuiz } from "./QuizContext";
import HomeScreen from "./HomeScreen";
import QuizListScreen from "./QuizListScreen";
import MakerScreen from "./MakerScreen";
import HistoryScreen from "./HistoryScreen";
import AnswerScreen from "./AnswerScreen";
import ResultsScreen from "./ResultsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabIcon = (symbol) => ({ focused }) => (
  <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>{symbol}</Text>
);

function MainTabs() {
  // Global state read straight from Context (no props needed)
  const { quizzes, attempts } = useQuiz();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#111827",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarLabelStyle: { fontWeight: "700", fontSize: 11 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: tabIcon("🏠") }}
      />

      <Tab.Screen
        name="Quizzes"
        component={QuizListScreen}
        options={{
          tabBarIcon: tabIcon("📚"),
          tabBarBadge: quizzes.length > 0 ? quizzes.length : undefined,
        }}
      />

      <Tab.Screen
        name="Create"
        component={MakerScreen}
        options={{ tabBarIcon: tabIcon("➕") }}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: tabIcon("📊"),
          tabBarBadge: attempts.length > 0 ? attempts.length : undefined,
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { isLoading, error, dismissError } = useQuiz();

  // Dependency array [error] -> runs only when `error` changes
  useEffect(() => {
    if (error) {
      Alert.alert("Storage Error", error, [
        { text: "OK", onPress: dismissError },
      ]);
    }
  }, [error]);

  // Loading state while AsyncStorage is being read
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#111827" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Answer" component={AnswerScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  // The Provider wraps everything so every screen can use the global state
  return (
    <QuizProvider>
      <AppNavigator />
    </QuizProvider>
  );
}
