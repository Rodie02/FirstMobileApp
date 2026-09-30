import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./HomeScreen";
import MakerScreen from "./MakerScreen";
import AnswerScreen from "./AnswerScreen";
import ResultsScreen from "./ResultsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [quiz, setQuiz] = useState(null);
  const [submittedAnswer, setSubmittedAnswer] = useState("");

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
              onCreateQuiz={setQuiz}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Answer">
          {(props) => (
            <AnswerScreen
              {...props}
              quiz={quiz}
              onSubmitAnswer={setSubmittedAnswer}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Results">
          {(props) => (
            <ResultsScreen
              {...props}
              quiz={quiz}
              submittedAnswer={submittedAnswer}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}