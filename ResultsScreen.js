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
}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.back}>‹ Back to Home</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Submitted Answer
          </Text>

          <Text style={styles.headerText}>
            View the answer submitted by the quiz taker.
          </Text>
        </View>

        {!quiz ? (
          <View style={styles.card}>
            <Text style={styles.emptyTitle}>No Quiz Yet</Text>

            <Text style={styles.emptyText}>
              Create a quiz first before viewing submitted answers.
            </Text>
          </View>
        ) : (
          <View>
            <View style={styles.card}>
              <Text style={styles.label}>QUESTION</Text>

              <Text style={styles.question}>
                {quiz.question}
              </Text>

              <Text style={styles.label}>QUESTION TYPE</Text>

              <Text style={styles.value}>
                {quiz.type}
              </Text>
            </View>

            <View style={styles.answerCard}>
              <Text style={styles.label}>
                SUBMITTED ANSWER
              </Text>

              {submittedAnswer ? (
                <Text style={styles.answer}>
                  {submittedAnswer}
                </Text>
              ) : (
                <Text style={styles.noAnswer}>
                  No answer has been submitted yet.
                </Text>
              )}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Maker")}
        >
          <Text style={styles.buttonText}>
            CREATE ANOTHER QUIZ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Answer")}
        >
          <Text style={styles.secondaryText}>
            VIEW QUIZ
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
    paddingBottom: 50,
  },

  back: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 18,
  },

  header: {
    backgroundColor: "#111827",
    borderRadius: 22,
    padding: 24,
    marginBottom: 20,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "900",
  },

  headerText: {
    color: "#D1D5DB",
    marginTop: 8,
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
  },

  answerCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    marginBottom: 14,
  },

  label: {
    fontSize: 11,
    fontWeight: "900",
    color: "#6B7280",
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  question: {
    fontSize: 19,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 27,
    marginBottom: 20,
  },

  value: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "700",
  },

  answer: {
    fontSize: 21,
    fontWeight: "800",
    color: "#047857",
    lineHeight: 30,
  },

  noAnswer: {
    color: "#6B7280",
    fontSize: 14,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
  },

  emptyText: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },

  button: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },

  secondaryButton: {
    paddingVertical: 17,
    alignItems: "center",
  },

  secondaryText: {
    color: "#374151",
    fontWeight: "800",
  },
});