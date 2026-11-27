// ==============================================================
// FILE: QuizListScreen.js  (tab: Quizzes)
// WHAT:  Lists every quiz. Buttons: TAKE (opens Answer), EDIT (opens Create in edit mode), DELETE.
// DATA FLOW: useQuiz() -> quizzes -> FlatList -> one card per quiz
//            DELETE -> confirmAction -> deleteQuiz(id) in Context -> list re-renders + AsyncStorage updates
// SEARCH (Ctrl+F):  [STATE]  [LOGIC]  [UI]  [NAVIGATION]  [STYLES]
// ==============================================================

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
} from "react-native";
import { useQuiz } from "./QuizContext";
import { formatDate, confirmAction } from "./Helpers";

export default function QuizListScreen({ navigation }) {
  // ==============================================================
  // [STATE + LOGIC] Global data from Context, and the delete handler
  // ==============================================================
  const { quizzes, attempts, deleteQuiz } = useQuiz();

  const confirmDelete = (quiz) => {
    confirmAction(
      "Delete quiz?",
      `"${quiz.title}" will be removed. Your past results stay in History.`,
      () => deleteQuiz(quiz.id)
    );
  };

  // ==============================================================
  // [UI] One quiz card (FlatList calls this once per quiz)
  // ==============================================================
  const renderQuiz = ({ item }) => {
    // [LOGIC] Derived data: how many times this quiz was taken and the best score
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
            // [NAVIGATION] open the Answer screen and pass this quiz's id as a route param
            onPress={() => navigation.navigate("Answer", { quizId: item.id })}
          >
            <Text style={styles.takeButtonText}>TAKE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            // [NAVIGATION] open the Create tab in EDIT mode by passing quizId
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

  // ==============================================================
  // [UI] The screen: a FlatList of quiz cards
  // ==============================================================
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={renderQuiz}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        // [UI] Title shown above the list
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Quizzes</Text>
            <Text style={styles.subtitle}>
              Pick a quiz to answer, edit, or delete.
            </Text>
          </View>
        }
        // [UI] Shown when there are no quizzes yet
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

// ==============================================================
// [STYLES] All colors, sizes and spacing for this screen
// ==============================================================
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
