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

export default function AnswerScreen({
  navigation,
  quiz,
  onSubmitAnswer,
}) {
  const [answers, setAnswers] = useState({});

  if (!quiz) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Quiz Available</Text>

          <Text style={styles.emptyText}>
            Please create a quiz first.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Maker")}
          >
            <Text style={styles.buttonText}>
              CREATE QUIZ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.backButtonText}>
              BACK TO HOME
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const updateAnswer = (questionId, answer) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: answer,
    }));
  };

  const submitQuiz = () => {
    const unanswered = quiz.questions.some(
      (question) =>
        !answers[question.id] ||
        answers[question.id].trim() === ""
    );

    if (unanswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    onSubmitAnswer(answers);

    navigation.navigate("Results", {
      answers,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{quiz.title}</Text>

        <Text style={styles.subtitle}>
          Answer all questions.
        </Text>

        {quiz.questions.map((question, index) => (
          <View
            style={styles.questionCard}
            key={question.id}
          >
            <Text style={styles.questionNumber}>
              QUESTION {index + 1}
            </Text>

            <Text style={styles.questionType}>
              {question.type}
            </Text>

            <Text style={styles.questionText}>
              {question.question}
            </Text>

            {question.type === "Multiple Choice" && (
              <View style={styles.choicesContainer}>
                {question.choices.map(
                  (choice, choiceIndex) => {
                    const letter =
                      String.fromCharCode(
                        65 + choiceIndex
                      );

                    const selected =
                      answers[question.id] === choice;

                    return (
                      <TouchableOpacity
                        key={choiceIndex}
                        style={[
                          styles.choiceButton,
                          selected &&
                            styles.selectedChoice,
                        ]}
                        onPress={() =>
                          updateAnswer(
                            question.id,
                            choice
                          )
                        }
                      >
                        <View
                          style={[
                            styles.radio,
                            selected &&
                              styles.selectedRadio,
                          ]}
                        >
                          {selected && (
                            <Text style={styles.radioCheck}>
                              ✓
                            </Text>
                          )}
                        </View>

                        <Text
                          style={[
                            styles.choiceLetter,
                            selected &&
                              styles.selectedChoiceText,
                          ]}
                        >
                          {letter}
                        </Text>

                        <Text
                          style={[
                            styles.choiceText,
                            selected &&
                              styles.selectedChoiceText,
                          ]}
                        >
                          {choice}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>
            )}

            {question.type === "Identification" && (
              <TextInput
                style={styles.input}
                placeholder="Type your answer"
                placeholderTextColor="#9CA3AF"
                value={answers[question.id] || ""}
                onChangeText={(value) =>
                  updateAnswer(
                    question.id,
                    value
                  )
                }
              />
            )}

            {question.type === "Enumeration" && (
              <View>
                <TextInput
                  style={[
                    styles.input,
                    styles.largeInput,
                  ]}
                  placeholder="Enter your answers"
                  placeholderTextColor="#9CA3AF"
                  value={answers[question.id] || ""}
                  onChangeText={(value) =>
                    updateAnswer(
                      question.id,
                      value
                    )
                  }
                  multiline
                />

                <Text style={styles.hint}>
                  Separate multiple answers with commas.
                </Text>
              </View>
            )}

            {question.type === "Essay" && (
              <TextInput
                style={[
                  styles.input,
                  styles.essayInput,
                ]}
                placeholder="Write your answer..."
                placeholderTextColor="#9CA3AF"
                value={answers[question.id] || ""}
                onChangeText={(value) =>
                  updateAnswer(
                    question.id,
                    value
                  )
                }
                multiline
                textAlignVertical="top"
              />
            )}
          </View>
        ))}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitQuiz}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            SUBMIT QUIZ
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          {quiz.questions.length}{" "}
          {quiz.questions.length === 1
            ? "question"
            : "questions"}
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

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  backText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "700",
    marginBottom: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#111827",
  },

  subtitle: {
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 20,
  },

  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  questionNumber: {
    fontSize: 12,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: 1.2,
  },

  questionType: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 12,
  },

  questionText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 26,
    marginBottom: 15,
  },

  choicesContainer: {
    gap: 10,
  },

  choiceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 12,
  },

  selectedChoice: {
    borderWidth: 2,
    borderColor: "#111827",
    backgroundColor: "#F3F4F6",
  },

  radio: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  selectedRadio: {
    borderColor: "#111827",
    backgroundColor: "#111827",
  },

  radioCheck: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  choiceLetter: {
    fontSize: 14,
    fontWeight: "900",
    color: "#6B7280",
    width: 25,
  },

  choiceText: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
  },

  selectedChoiceText: {
    fontWeight: "800",
    color: "#111827",
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    color: "#111827",
    minHeight: 52,
  },

  largeInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  essayInput: {
    minHeight: 160,
    textAlignVertical: "top",
  },

  hint: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 7,
  },

  submitButton: {
    backgroundColor: "#111827",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 5,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  emptyTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: "#111827",
  },

  emptyText: {
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#111827",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 13,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  backButton: {
    marginTop: 12,
    padding: 10,
  },

  backButtonText: {
    color: "#6B7280",
    fontWeight: "800",
  },
});