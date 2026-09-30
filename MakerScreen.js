import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

export default function MakerScreen({ navigation, onCreateQuiz }) {
  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [question, setQuestion] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const postQuestion = () => {
    if (question.trim() === "") {
      alert("Please enter a question.");
      return;
    }

    if (questionType === "Multiple Choice") {
      if (
        choiceA.trim() === "" ||
        choiceB.trim() === "" ||
        choiceC.trim() === "" ||
        choiceD.trim() === ""
      ) {
        alert("Please enter all four choices.");
        return;
      }

      if (correctAnswer === "") {
        alert("Please select the correct answer.");
        return;
      }
    } else {
      if (correctAnswer.trim() === "") {
        alert("Please enter the correct answer.");
        return;
      }
    }

    const quiz = {
      type: questionType,
      question: question.trim(),
      choices:
        questionType === "Multiple Choice"
          ? [
              choiceA.trim(),
              choiceB.trim(),
              choiceC.trim(),
              choiceD.trim(),
            ]
          : [],
      correctAnswer: correctAnswer.trim(),
    };

    onCreateQuiz(quiz);

    alert("Question posted successfully!");

    navigation.navigate("Answer");
  };

  const selectCorrectAnswer = (answer) => {
    setCorrectAnswer(answer);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Quiz Maker</Text>

        <Text style={styles.subtitle}>
          Create and post your question
        </Text>

        <Text style={styles.label}>Question Type</Text>

        <View style={styles.typeContainer}>
          {[
            "Multiple Choice",
            "Identification",
            "Enumeration",
            "Essay",
          ].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                questionType === type && styles.selectedType,
              ]}
              onPress={() => {
                setQuestionType(type);
                setCorrectAnswer("");
              }}
            >
              <Text
                style={[
                  styles.typeText,
                  questionType === type && styles.selectedTypeText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Question</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your question"
          value={question}
          onChangeText={setQuestion}
          multiline
        />

        {questionType === "Multiple Choice" && (
          <>
            <Text style={styles.label}>Choices</Text>

            <TouchableOpacity
              style={[
                styles.choiceRow,
                correctAnswer === choiceA && choiceA !== "" && styles.correctChoice,
              ]}
              onPress={() => selectCorrectAnswer(choiceA)}
            >
              <View style={styles.radio}>
                {correctAnswer === choiceA && choiceA !== "" && (
                  <Text style={styles.check}>✓</Text>
                )}
              </View>

              <TextInput
                style={styles.choiceInput}
                placeholder="Choice A"
                value={choiceA}
                onChangeText={setChoiceA}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.choiceRow,
                correctAnswer === choiceB && choiceB !== "" && styles.correctChoice,
              ]}
              onPress={() => selectCorrectAnswer(choiceB)}
            >
              <View style={styles.radio}>
                {correctAnswer === choiceB && choiceB !== "" && (
                  <Text style={styles.check}>✓</Text>
                )}
              </View>

              <TextInput
                style={styles.choiceInput}
                placeholder="Choice B"
                value={choiceB}
                onChangeText={setChoiceB}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.choiceRow,
                correctAnswer === choiceC && choiceC !== "" && styles.correctChoice,
              ]}
              onPress={() => selectCorrectAnswer(choiceC)}
            >
              <View style={styles.radio}>
                {correctAnswer === choiceC && choiceC !== "" && (
                  <Text style={styles.check}>✓</Text>
                )}
              </View>

              <TextInput
                style={styles.choiceInput}
                placeholder="Choice C"
                value={choiceC}
                onChangeText={setChoiceC}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.choiceRow,
                correctAnswer === choiceD && choiceD !== "" && styles.correctChoice,
              ]}
              onPress={() => selectCorrectAnswer(choiceD)}
            >
              <View style={styles.radio}>
                {correctAnswer === choiceD && choiceD !== "" && (
                  <Text style={styles.check}>✓</Text>
                )}
              </View>

              <TextInput
                style={styles.choiceInput}
                placeholder="Choice D"
                value={choiceD}
                onChangeText={setChoiceD}
              />
            </TouchableOpacity>

            <Text style={styles.hint}>
              Tap the circle beside a choice to mark it as correct.
            </Text>
          </>
        )}

        {questionType !== "Multiple Choice" && (
          <>
            <Text style={styles.label}>Correct Answer</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter the correct answer"
              value={correctAnswer}
              onChangeText={setCorrectAnswer}
              multiline
            />
          </>
        )}

        <TouchableOpacity
          style={styles.postButton}
          onPress={postQuestion}
          activeOpacity={0.8}
        >
          <Text style={styles.postButtonText}>
            POST QUESTION
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 15,
  },

  backText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "700",
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#111827",
  },

  subtitle: {
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
    marginTop: 12,
  },

  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  selectedType: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  typeText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 12,
  },

  selectedTypeText: {
    color: "#FFFFFF",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 15,
    fontSize: 15,
    color: "#111827",
    minHeight: 55,
  },

  choiceRow: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  correctChoice: {
    borderColor: "#111827",
    borderWidth: 2,
  },

  radio: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  check: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },

  choiceInput: {
    flex: 1,
    padding: 10,
    fontSize: 15,
    color: "#111827",
  },

  hint: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 15,
  },

  postButton: {
    backgroundColor: "#111827",
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 25,
  },

  postButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },
});