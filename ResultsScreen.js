import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function ResultsScreen({
  navigation,
  quiz,
  submittedAnswer,
  onDeleteQuiz,
}) {
  if (!quiz) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No Submitted Quiz
          </Text>

          <Text style={styles.emptyText}>
            There is no saved quiz yet.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Maker")}
          >
            <Text style={styles.buttonText}>
              CREATE QUIZ
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isCorrect =
    submittedAnswer.trim().toLowerCase() ===
    quiz.correctAnswer.trim().toLowerCase();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backText}>
            ‹ Back to Home
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Submitted Answer
        </Text>

        <Text style={styles.subtitle}>
          Review the submitted answer below.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            QUESTION
          </Text>

          <Text style={styles.question}>
            {quiz.question}
          </Text>

          <Text style={styles.label}>
            YOUR ANSWER
          </Text>

          <View
            style={[
              styles.answerBox,
              isCorrect
                ? styles.correctBox
                : styles.wrongBox,
            ]}
          >
            <Text
              style={[
                styles.answerText,
                isCorrect
                  ? styles.correctText
                  : styles.wrongText,
              ]}
            >
              {submittedAnswer || "No answer submitted"}
            </Text>
          </View>

          <Text style={styles.label}>
            CORRECT ANSWER
          </Text>

          <Text style={styles.correctAnswer}>
            {quiz.correctAnswer}
          </Text>

          <View
            style={[
              styles.statusBox,
              isCorrect
                ? styles.correctStatus
                : styles.wrongStatus,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isCorrect
                  ? styles.correctStatusText
                  : styles.wrongStatusText,
              ]}
            >
              {isCorrect
                ? "✓ CORRECT ANSWER"
                : "✕ WRONG ANSWER"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Answer")}
        >
          <Text style={styles.buttonText}>
            ANSWER AGAIN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            alert("Quiz and submitted answer deleted.");
            onDeleteQuiz();
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.deleteText}>
            DELETE QUIZ
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

  backText: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 20,
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

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  label: {
    fontSize: 11,
    fontWeight: "900",
    color: "#6B7280",
    letterSpacing: 1.5,
    marginTop: 8,
    marginBottom: 8,
  },

  question: {
    fontSize: 19,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
    lineHeight: 27,
  },

  answerBox: {
    borderRadius: 14,
    padding: 15,
    borderWidth: 2,
    marginBottom: 20,
  },

  correctBox: {
    backgroundColor: "#ECFDF5",
    borderColor: "#10B981",
  },

  wrongBox: {
    backgroundColor: "#FEF2F2",
    borderColor: "#EF4444",
  },

  answerText: {
    fontSize: 16,
    fontWeight: "800",
  },

  correctText: {
    color: "#047857",
  },

  wrongText: {
    color: "#DC2626",
  },

  correctAnswer: {
    fontSize: 17,
    fontWeight: "800",
    color: "#047857",
    marginBottom: 20,
  },

  statusBox: {
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  correctStatus: {
    backgroundColor: "#D1FAE5",
  },

  wrongStatus: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontSize: 15,
    fontWeight: "900",
  },

  correctStatusText: {
    color: "#047857",
  },

  wrongStatusText: {
    color: "#DC2626",
  },

  button: {
    backgroundColor: "#111827",
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    letterSpacing: 1,
  },

  deleteButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#EF4444",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 12,
  },

  deleteText: {
    color: "#DC2626",
    fontWeight: "900",
    letterSpacing: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },

  emptyTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
  },

  emptyText: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },
});