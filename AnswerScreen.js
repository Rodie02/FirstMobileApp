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

export default function AnswerScreen({
  navigation,
  quiz,
  onSubmitAnswer,
}) {
  const [answer, setAnswer] = useState("");

  if (!quiz) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Quiz Available</Text>

          <Text style={styles.emptyText}>
            The quiz maker has not posted a question yet.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Maker")}
          >
            <Text style={styles.buttonText}>CREATE A QUIZ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.homeButtonText}>BACK TO HOME</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const submitAnswer = () => {
    if (!answer.trim()) {
      alert("Please answer the question.");
      return;
    }

    onSubmitAnswer(answer.trim());

    alert("Answer submitted successfully!");

    navigation.navigate("Results");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.back}>‹ Back to Home</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Quiz Taker</Text>

          <Text style={styles.headerText}>
            Answer the question posted by the quiz maker.
          </Text>
        </View>

        <View style={styles.quizCard}>
          <Text style={styles.type}>{quiz.type}</Text>

          <Text style={styles.question}>{quiz.question}</Text>

          {quiz.type === "Multiple Choice" ? (
            <View>
              {quiz.choices.map((choice, index) => {
                const letter = String.fromCharCode(65 + index);

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.choice,
                      answer === choice && styles.selectedChoice,
                    ]}
                    onPress={() => setAnswer(choice)}
                  >
                    <View
                      style={[
                        styles.radio,
                        answer === choice && styles.selectedRadio,
                      ]}
                    >
                      {answer === choice && (
                        <View style={styles.radioDot} />
                      )}
                    </View>

                    <Text style={styles.choiceLetter}>
                      {letter}.
                    </Text>

                    <Text style={styles.choiceText}>
                      {choice}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <TextInput
              style={
                quiz.type === "Essay"
                  ? styles.essayInput
                  : styles.answerInput
              }
              placeholder="Type your answer here..."
              multiline={quiz.type === "Essay"}
              value={answer}
              onChangeText={setAnswer}
              textAlignVertical={
                quiz.type === "Essay" ? "top" : "center"
              }
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitAnswer}
        >
          <Text style={styles.submitText}>SUBMIT ANSWER</Text>
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

  quizCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  type: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 12,
  },

  question: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 28,
    marginBottom: 22,
  },

  choice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 15,
    marginBottom: 10,
  },

  selectedChoice: {
    backgroundColor: "#ECFDF5",
    borderColor: "#059669",
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  selectedRadio: {
    borderColor: "#059669",
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#059669",
  },

  choiceLetter: {
    fontWeight: "900",
    color: "#374151",
    marginRight: 7,
  },

  choiceText: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },

  answerInput: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 13,
    padding: 15,
    fontSize: 15,
  },

  essayInput: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 13,
    padding: 15,
    fontSize: 15,
    minHeight: 170,
    textAlignVertical: "top",
  },

  submitButton: {
    backgroundColor: "#059669",
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 18,
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },

  emptyTitle: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    color: "#111827",
  },

  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 10,
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  homeButton: {
    padding: 16,
    alignItems: "center",
  },

  homeButtonText: {
    color: "#374151",
    fontWeight: "800",
  },
});