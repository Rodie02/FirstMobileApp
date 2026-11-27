// ==============================================================
// FILE: App.js  (app entry point)
// WHAT:  Sets up NAVIGATION and wraps the app in the global-state Provider.
//        The tab bar and the stack are defined here. Screens live in their own files.
//
// FLOW:  App -> QuizProvider (global state) -> AppNavigator -> Stack -> MainTabs / Answer / Results
// SEARCH (Ctrl+F):  [STATE]  [LOGIC]  [UI]  [NAVIGATION]  [STYLES]
// ==============================================================

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
import { ActivityIndicator, Text, View } from "react-native";

import { QuizProvider, useQuiz } from "./QuizContext";
import HomeScreen from "./HomeScreen";
import QuizListScreen from "./QuizListScreen";
import MakerScreen from "./MakerScreen";
import HistoryScreen from "./HistoryScreen";
import AnswerScreen from "./AnswerScreen";
import ResultsScreen from "./ResultsScreen";
import { showMessage } from "./Helpers";
import ScreenTransition from "./ScreenTransition";

// ==============================================================
// [NAVIGATION] Create the two navigators (Stack = screens on top, Tab = bottom bar)
// ==============================================================
// ==============================================================
// [UI] ANIMATION: withTransition() wraps a screen in <ScreenTransition>
// so it fades/slides in whenever the user navigates to it.
// Created once here (outside components) so the screens are not re-created.
// ==============================================================
const withTransition = (Screen) =>
  function AnimatedScreen(props) {
    return (
      <ScreenTransition>
        <Screen {...props} />
      </ScreenTransition>
    );
  };

const AnimatedHome = withTransition(HomeScreen);
const AnimatedQuizList = withTransition(QuizListScreen);
const AnimatedMaker = withTransition(MakerScreen);
const AnimatedHistory = withTransition(HistoryScreen);
const AnimatedAnswer = withTransition(AnswerScreen);
const AnimatedResults = withTransition(ResultsScreen);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// [UI] Small emoji icon shown on each tab
const tabIcon = (symbol) => ({ focused }) => (
  <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>{symbol}</Text>
);

// ==============================================================
// [NAVIGATION] Bottom tab bar: Home | Quizzes | Create | History
//      [UI] Badges on Quizzes/History show counts read from Context
// ==============================================================
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
        component={AnimatedHome}
        options={{ tabBarIcon: tabIcon("🏠") }}
      />

      <Tab.Screen
        name="Quizzes"
        component={AnimatedQuizList}
        options={{
          tabBarIcon: tabIcon("📚"),
          tabBarBadge: quizzes.length > 0 ? quizzes.length : undefined,
        }}
      />

      <Tab.Screen
        name="Create"
        component={AnimatedMaker}
        options={{ tabBarIcon: tabIcon("➕") }}
      />

      <Tab.Screen
        name="History"
        component={AnimatedHistory}
        options={{
          tabBarIcon: tabIcon("📊"),
          tabBarBadge: attempts.length > 0 ? attempts.length : undefined,
        }}
      />
    </Tab.Navigator>
  );
}

// ==============================================================
// [LOGIC] Shows a spinner while AsyncStorage loads, an error popup if storage fails,
//      then renders the Stack navigator (MainTabs + Answer + Results)
// ==============================================================
function AppNavigator() {
  const { isLoading, error, dismissError } = useQuiz();

  // Dependency array [error] -> runs only when `error` changes
  useEffect(() => {
    if (error) {
      showMessage("Storage Error", error);
      dismissError();
    }
  }, [error]);

  // [UI] Loading spinner
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
        <Stack.Screen name="Answer" component={AnimatedAnswer} />
        <Stack.Screen name="Results" component={AnimatedResults} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ==============================================================
// [LOGIC] Root component: the Provider makes global state available everywhere
// ==============================================================
export default function App() {
  // The Provider wraps everything so every screen can use the global state
  return (
    <QuizProvider>
      <AppNavigator />
    </QuizProvider>
  );
}
