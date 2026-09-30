import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./HomeScreen";
import MakerScreen from "./MakerScreen";
import AnswerScreen from "./AnswerScreen";
import ResultsScreen from "./ResultsScreen";

const Stack = createNativeStackNavigator();

const QUIZ_STORAGE_KEY = "@quiz_data";
const ANSWER_STORAGE_KEY = "@submitted_answer";

export default function App() {
  const [quiz, setQuiz] = useState(null);
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedQuiz = await AsyncStorage.getItem(QUIZ_STORAGE_KEY);
      const savedAnswer = await AsyncStorage.getItem(ANSWER_STORAGE_KEY);

      if (savedQuiz) {
        setQuiz(JSON.parse(savedQuiz));
      }

      if (savedAnswer) {
        setSubmittedAnswer(savedAnswer);
      }
    } catch (error) {
      console.log("Error loading saved data:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  const createQuiz = async (newQuiz) => {
    try {
      await AsyncStorage.setItem(
        QUIZ_STORAGE_KEY,
        JSON.stringify(newQuiz)
      );

      await AsyncStorage.removeItem(ANSWER_STORAGE_KEY);

      setQuiz(newQuiz);
      setSubmittedAnswer("");
    } catch (error) {
      console.log("Error saving quiz:", error);
    }
  };

  const submitAnswer = async (answer) => {
    try {
      await AsyncStorage.setItem(
        ANSWER_STORAGE_KEY,
        answer
      );

      setSubmittedAnswer(answer);
    } catch (error) {
      console.log("Error saving answer:", error);
    }
  };

  const deleteQuiz = async () => {
    try {
      await AsyncStorage.removeItem(QUIZ_STORAGE_KEY);
      await AsyncStorage.removeItem(ANSWER_STORAGE_KEY);

      setQuiz(null);
      setSubmittedAnswer("");
    } catch (error) {
      console.log("Error deleting quiz:", error);
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen {...props} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Maker">
          {(props) => (
            <MakerScreen
              {...props}
              onCreateQuiz={createQuiz}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Answer">
          {(props) => (
            <AnswerScreen
              {...props}
              quiz={quiz}
              onSubmitAnswer={submitAnswer}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Results">
          {(props) => (
            <ResultsScreen
              {...props}
              quiz={quiz}
              submittedAnswer={submittedAnswer}
              onDeleteQuiz={deleteQuiz}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}