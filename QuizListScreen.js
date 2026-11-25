// QuizListScreen.js  (Quizzes tab)
// READ + DELETE of quizzes from Context. Buttons open Answer (stack) or Create (tab, edit mode).

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import { useQuiz } from "./QuizContext";
import { formatDate } from "./Helpers";

export default function QuizListScreen({ navigation }) {
  const { quizzes, attempts, deleteQuiz } = useQuiz();

  const confirmDelete = (quiz) => {
    Alert.alert(
      "Delete quiz?",
      `"${quiz.title}" will be removed. Your past results stay in History.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteQuiz(quiz.id),
        },
      ]
    );
  };

  const renderQuiz = ({ item }) => {
    const quizAttempts = attempts.filter((a) => a.quizId === item.id);
    const best =
      quizAttempts.length > 0
        ? Math.max(...quizAttempts.map((a) => a.percentage))
        : null;

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>

        <Text style={styles.cardMeta}>
          {item.questions.length}{" "}
          {item.questions.length === 1 ? "question" : "questions"} •{" "}
          {formatDate(item.createdAt)}
        </Text>

        <Text style={styles.cardMeta}>
          {quizAttempts.length === 0
            ? "Not taken yet"
            : `Taken ${quizAttempts.length}x • Best score ${best}%`}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.takeButton}
            onPress={() => navigation.navigate("Answer", { quizId: item.id })}
          >
            <Text style={styles.takeButtonText}>TAKE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => navigation.navigate("Create", { quizId: item.id })}
          >
            <Text style={styles.outlineButtonText}>EDIT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmDelete(item)}
          >
            <Text style={styles.deleteButtonText}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={renderQuiz}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Quizzes</Text>
            <Text style={styles.subtitle}>
              Pick a quiz to answer, edit, or delete.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Quizzes Yet</Text>
            <Text style={styles.emptyText}>
              Create your first quiz to get started.
            </Text>

            <TouchableOpacity
              style={styles.takeButton}
              onPress={() => navigation.navigate("Create")}
            >
              <Text style={styles.takeButtonText}>CREATE QUIZ</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA" },
  content: { padding: 20, paddingBottom: 40 },

  title: { fontSize: 32, fontWeight: "900", color: "#111827" },
  subtitle: { color: "#6B7280", marginTop: 5, marginBottom: 20 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardTitle: { fontSize: 19, fontWeight: "900", color: "#111827" },
  cardMeta: { color: "#6B7280", fontSize: 12, marginTop: 5, fontWeight: "600" },

  buttonRow: { flexDirection: "row", gap: 8, marginTop: 16 },

  takeButton: {
    flex: 1,
    backgroundColor: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  takeButtonText: { color: "#FFFFFF", fontWeight: "900", fontSize: 12, letterSpacing: 1 },

  outlineButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#111827",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  outlineButtonText: { color: "#111827", fontWeight: "900", fontSize: 12, letterSpacing: 1 },

  deleteButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#DC2626",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteButtonText: { color: "#DC2626", fontWeight: "900", fontSize: 12, letterSpacing: 1 },

  emptyContainer: { alignItems: "center", paddingTop: 60 },
  emptyTitle: { fontSize: 25, fontWeight: "900", color: "#111827" },
  emptyText: { color: "#6B7280", marginTop: 8, marginBottom: 20 },
});
