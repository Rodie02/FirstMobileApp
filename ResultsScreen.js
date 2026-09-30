import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

export default function ResultsScreen({
  navigation,
  quiz,
  submittedAnswer,
  route,
  onDeleteQuiz,
}) {
  const answersFromRoute = route?.params?.answers;

  const answers =
    answersFromRoute || submittedAnswer || {};

  if (!quiz) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No Results Available
          </Text>

          <Text style={styles.emptyText}>
            Please create and answer a quiz first.
          </Text>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.homeButtonText}>
              BACK TO HOME
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const normalizeAnswer = (answer) => {
    return String(answer || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  };

  const checkAnswer = (question, userAnswer) => {
    const user = normalizeAnswer(userAnswer);
    const correct = normalizeAnswer(
      question.correctAnswer
    );

    if (!user) {
      return false;
    }

    if (question.type === "Enumeration") {
      const userItems = user
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const correctItems = correct
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      if (userItems.length !== correctItems.length) {
        return false;
      }

      const sortedUser = [...userItems].sort();
      const sortedCorrect = [...correctItems].sort();

      return sortedUser.every(
        (item, index) =>
          item === sortedCorrect[index]
      );
    }

    return user === correct;
  };

  const results = quiz.questions.map((question) => {
    const userAnswer = answers[question.id] || "";

    const isCorrect = checkAnswer(
      question,
      userAnswer
    );

    return {
      ...question,
      userAnswer,
      isCorrect,
    };
  });

  const correctCount = results.filter(
    (item) => item.isCorrect
  ).length;

  const totalQuestions = results.length;

  const percentage =
    totalQuestions > 0
      ? Math.round(
          (correctCount / totalQuestions) * 100
        )
      : 0;

  const deleteQuiz = () => {
    if (onDeleteQuiz) {
      onDeleteQuiz();
    }

    navigation.navigate("Home");
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
          <Text style={styles.backText}>
            ‹ Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Results
        </Text>

        <Text style={styles.quizTitle}>
          {quiz.title}
        </Text>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>
            YOUR SCORE
          </Text>

          <Text style={styles.score}>
            {correctCount} / {totalQuestions}
          </Text>

          <Text style={styles.percentage}>
            {percentage}%
          </Text>

          <Text style={styles.scoreDescription}>
            {correctCount === totalQuestions
              ? "Perfect score!"
              : "Review your answers below."}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {correctCount}
            </Text>

            <Text style={styles.correctSummary}>
              Correct
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {totalQuestions - correctCount}
            </Text>

            <Text style={styles.wrongSummary}>
              Wrong
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {totalQuestions}
            </Text>

            <Text style={styles.totalSummary}>
              Total
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          ANSWER REVIEW
        </Text>

        {results.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.resultCard,
              item.isCorrect
                ? styles.correctCard
                : styles.wrongCard,
            ]}
          >
            <View style={styles.resultHeader}>
              <Text style={styles.questionNumber}>
                QUESTION {index + 1}
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  item.isCorrect
                    ? styles.correctBadge
                    : styles.wrongBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    item.isCorrect
                      ? styles.correctStatusText
                      : styles.wrongStatusText,
                  ]}
                >
                  {item.isCorrect
                    ? "CORRECT"
                    : "WRONG"}
                </Text>
              </View>
            </View>

            <Text style={styles.questionType}>
              {item.type}
            </Text>

            <Text style={styles.questionText}>
              {item.question}
            </Text>

            <View style={styles.answerBox}>
              <Text style={styles.answerLabel}>
                YOUR ANSWER
              </Text>

              <Text
                style={[
                  styles.answerText,
                  item.isCorrect
                    ? styles.correctAnswerText
                    : styles.wrongAnswerText,
                ]}
              >
                {item.userAnswer || "No answer"}
              </Text>
            </View>

            {!item.isCorrect && (
              <View style={styles.correctAnswerBox}>
                <Text style={styles.answerLabel}>
                  CORRECT / REFERENCE ANSWER
                </Text>

                <Text style={styles.referenceAnswerText}>
                  {item.correctAnswer}
                </Text>
              </View>
            )}

            {item.isCorrect &&
              item.type === "Essay" && (
                <View style={styles.correctAnswerBox}>
                  <Text style={styles.answerLabel}>
                    REFERENCE ANSWER
                  </Text>

                  <Text
                    style={styles.referenceAnswerText}
                  >
                    {item.correctAnswer}
                  </Text>
                </View>
              )}
          </View>
        ))}

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.homeButtonText}>
            BACK TO HOME
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteQuiz}
        >
          <Text style={styles.deleteButtonText}>
            DELETE QUIZ
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Your quiz results have been reviewed.
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
    fontSize: 32,
    fontWeight: "900",
    color: "#111827",
  },

  quizTitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "700",
    marginTop: 5,
    marginBottom: 20,
  },

  scoreCard: {
    backgroundColor: "#111827",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
    marginBottom: 15,
  },

  scoreLabel: {
    color: "#D1D5DB",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  score: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    marginTop: 8,
  },

  percentage: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 2,
  },

  scoreDescription: {
    color: "#D1D5DB",
    fontSize: 12,
    marginTop: 8,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 25,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  summaryNumber: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },

  correctSummary: {
    fontSize: 11,
    fontWeight: "800",
    color: "#16A34A",
    marginTop: 3,
  },

  wrongSummary: {
    fontSize: 11,
    fontWeight: "800",
    color: "#DC2626",
    marginTop: 3,
  },

  totalSummary: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B7280",
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: 1.2,
    marginBottom: 12,
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 2,
  },

  correctCard: {
    borderColor: "#86EFAC",
  },

  wrongCard: {
    borderColor: "#FCA5A5",
  },

  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  questionNumber: {
    fontSize: 12,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: 1.1,
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 8,
  },

  correctBadge: {
    backgroundColor: "#DCFCE7",
  },

  wrongBadge: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  correctStatusText: {
    color: "#15803D",
  },

  wrongStatusText: {
    color: "#B91C1C",
  },

  questionType: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "700",
    marginTop: 5,
    marginBottom: 12,
  },

  questionText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 15,
  },

  answerBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 13,
    padding: 13,
    marginBottom: 10,
  },

  correctAnswerBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 13,
    padding: 13,
  },

  answerLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "#6B7280",
    letterSpacing: 1,
    marginBottom: 6,
  },

  answerText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 21,
  },

  correctAnswerText: {
    color: "#15803D",
  },

  wrongAnswerText: {
    color: "#B91C1C",
  },

  referenceAnswerText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 21,
    color: "#111827",
  },

  homeButton: {
    backgroundColor: "#111827",
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },

  deleteButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#DC2626",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  deleteButtonText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 11,
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
});