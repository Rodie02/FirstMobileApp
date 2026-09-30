import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function MakerScreen({ navigation, route }) {
  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [question, setQuestion] = useState("");

  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState("");

  const questionTypes = [
    "Multiple Choice",
    "Identification",
    "Enumeration",
    "Essay",
  ];

  const postQuestion = () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    if (questionType === "Multiple Choice") {
      if (
        !choiceA.trim() ||
        !choiceB.trim() ||
        !choiceC.trim() ||
        !choiceD.trim()
      ) {
        alert("Please complete all four choices.");
        return;
      }

      if (!correctAnswer) {
        alert("Please select the correct answer.");
        return;
      }
    }

    if (
      questionType !== "Multiple Choice" &&
      !correctAnswer.trim()
    ) {
      alert("Please enter the correct answer.");
      return;
    }

    const newQuiz = {
      type: questionType,
      question: question.trim(),
      choices:
        questionType === "Multiple Choice"
          ? [choiceA, choiceB, choiceC, choiceD]
          : [],
      correctAnswer: correctAnswer,
    };

    navigation.navigate("Answer", {
      quiz: newQuiz,
    });
  };

  const renderMultipleChoice = () => {
    if (questionType !== "Multiple Choice") {
      return null;
    }

    const choices = [
      {
        label: "A",
        value: choiceA,
        setValue: setChoiceA,
      },
      {
        label: "B",
        value: choiceB,
        setValue: setChoiceB,
      },
      {
        label: "C",
        value: choiceC,
        setValue: setChoiceC,
      },
      {
        label: "D",
        value: choiceD,
        setValue: setChoiceD,
      },
    ];

    return (
      <View>
        <Text style={styles.sectionLabel}>
          Answer Choices
        </Text>

        {choices.map((choice) => (
          <View key={choice.label} style={styles.choiceRow}>
            <Text style={styles.choiceLabel}>
              {choice.label}
            </Text>

            <TextInput
              style={styles.choiceInput}
              placeholder={`Choice ${choice.label}`}
              value={choice.value}
              onChangeText={choice.setValue}
            />

            <TouchableOpacity
              style={[
                styles.correctButton,
                correctAnswer === choice.value &&
                  choice.value.trim() !== "" &&
                  styles.correctButtonSelected,
              ]}
              onPress={() => {
                if (choice.value.trim()) {
                  setCorrectAnswer(choice.value);
                } else {
                  alert(
                    `Enter Choice ${choice.label} first.`
                  );
                }
              }}
            >
              <Text
                style={[
                  styles.correctButtonText,
                  correctAnswer === choice.value &&
                    choice.value.trim() !== "" &&
                    styles.correctButtonTextSelected,
                ]}
              >
                ✓
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.helperText}>
          Tap ✓ beside a choice to mark it as the correct answer.
        </Text>
      </View>
    );
  };

  const renderAnswerField = () => {
    if (questionType === "Multiple Choice") {
      return null;
    }

    return (
      <View>
        <Text style={styles.sectionLabel}>
          Correct Answer
        </Text>

        <TextInput
          style={
            questionType === "Essay"
              ? [styles.input, styles.largeInput]
              : styles.input
          }
          placeholder={
            questionType === "Essay"
              ? "Enter the expected answer or guide..."
              : "Enter the correct answer..."
          }
          multiline={questionType === "Essay"}
          textAlignVertical={
            questionType === "Essay" ? "top" : "center"
          }
          value={correctAnswer}
          onChangeText={setCorrectAnswer}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backText}>
            ‹ Back to Home
          </Text>
        </TouchableOpacity>

        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>
            Create Quiz
          </Text>

          <Text style={styles.headerDescription}>
            Create a question and post it for the quiz taker.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Question Type
        </Text>

        <View style={styles.typeContainer}>
          {questionTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                questionType === type &&
                  styles.typeButtonSelected,
              ]}
              onPress={() => {
                setQuestionType(type);
                setCorrectAnswer("");
              }}
            >
              <Text
                style={[
                  styles.typeText,
                  questionType === type &&
                    styles.typeTextSelected,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>
          Question
        </Text>

        <TextInput
          style={[styles.input, styles.questionInput]}
          placeholder="Write your question here..."
          multiline
          textAlignVertical="top"
          value={question}
          onChangeText={setQuestion}
        />

        {renderMultipleChoice()}

        {renderAnswerField()}

        <TouchableOpacity
          style={styles.postButton}
          onPress={postQuestion}
          activeOpacity={0.8}
        >
          <Text style={styles.postButtonText}>
            POST QUESTION
          </Text>
        </TouchableOpacity>

        <Text style={styles.bottomNote}>
          The posted question will appear on the Quiz Taker
          screen.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },

  backButton: {
    marginBottom: 18,
  },

  backText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },

  headerCard: {
    backgroundColor: "#111827",
    borderRadius: 22,
    padding: 24,
    marginBottom: 25,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 7,
  },

  headerDescription: {
    color: "#D1D5DB",
    fontSize: 14,
    lineHeight: 21,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#374151",
    marginBottom: 9,
  },

  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 22,
  },

  typeButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginRight: 7,
    marginBottom: 8,
  },

  typeButtonSelected: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  typeText: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "600",
  },

  typeTextSelected: {
    color: "#FFFFFF",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 15,
    color: "#111827",
    marginBottom: 16,
  },

  questionInput: {
    minHeight: 110,
  },

  largeInput: {
    minHeight: 150,
  },

  choiceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  choiceLabel: {
    width: 30,
    fontSize: 15,
    fontWeight: "900",
    color: "#111827",
  },

  choiceInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827",
    marginRight: 8,
  },

  correctButton: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },

  correctButtonSelected: {
    backgroundColor: "#059669",
    borderColor: "#059669",
  },

  correctButtonText: {
    color: "#9CA3AF",
    fontSize: 18,
    fontWeight: "900",
  },

  correctButtonTextSelected: {
    color: "#FFFFFF",
  },

  helperText: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
    marginBottom: 20,
  },

  postButton: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 5,
  },

  postButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },

  bottomNote: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 14,
  },
});