// ==============================================================
// FILE: HistoryScreen.js  (tab: History)
// WHAT:  Lists every submitted attempt. Tap one to see its Results.
// DATA FLOW: useQuiz() -> attempts -> FlatList -> tap -> navigate('Results', { attemptId })
// SEARCH (Ctrl+F):  [STATE]  [LOGIC]  [UI]  [NAVIGATION]  [STYLES]
// ==============================================================

// HistoryScreen.js  (History tab)
// Lists every submitted attempt (READ). Tap one to open Results (stack screen)
// and pass its id as a route param.

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
import { formatDate, formatTime, confirmAction } from "./helpers";

export default function HistoryScreen({ navigation }) {
  // ==============================================================
  // [STATE + LOGIC] Global data from Context, and the clear-all handler
  // ==============================================================
  const { attempts, clearAttempts, deleteAttempt } = useQuiz();

  // [LOGIC] Delete ONE attempt: ask first, then remove it from Context
  // (Context state changes -> list re-renders -> AsyncStorage is updated)
  const confirmDelete = (attempt) => {
    confirmAction(
      "Delete result?",
      `Remove your attempt on "${attempt.quizTitle}" from history?`,
      () => deleteAttempt(attempt.id)
    );
  };

  const confirmClear = () => {
    confirmAction(
      "Clear history?",
      "All submitted results will be removed.",
      clearAttempts,
      "Clear"
    );
  };

  // ==============================================================
  // [UI] One attempt card (FlatList calls this once per attempt)
  // ==============================================================
  const renderAttempt = ({ item }) => {
    // [LOGIC] 75% or higher = green badge, otherwise red
    const passed = item.percentage >= 75;

    return (
      <View style={styles.card}>
        {/* [UI] Top part: tap anywhere here to open the result */}
        <TouchableOpacity
          style={styles.cardTop}
          activeOpacity={0.8}
          // [NAVIGATION] open Results for this attempt
          onPress={() => navigation.navigate("Results", { attemptId: item.id })}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.quizTitle}</Text>
            <Text style={styles.cardMeta}>{formatDate(item.submittedAt)}</Text>
            <Text style={styles.cardMeta}>
              ⏱ {formatTime(item.durationSeconds)} • {item.correctCount} /{" "}
              {item.totalQuestions} correct
            </Text>
          </View>

          <View style={[styles.badge, passed ? styles.goodBadge : styles.badBadge]}>
            <Text style={[styles.badgeText, passed ? styles.goodText : styles.badText]}>
              {item.percentage}%
            </Text>
          </View>
        </TouchableOpacity>

        {/* [UI] Buttons: VIEW RESULT and DELETE. [LOGIC] DELETE calls confirmDelete() */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => navigation.navigate("Results", { attemptId: item.id })}
          >
            <Text style={styles.viewButtonText}>VIEW RESULT</Text>
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
  // [UI] The screen: a FlatList of attempt cards
  // ==============================================================
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={attempts}
        keyExtractor={(item) => item.id}
        renderItem={renderAttempt}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        // [UI] Title and Clear all button
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>History</Text>
              <Text style={styles.subtitle}>Submitted answers and scores.</Text>
            </View>

            {attempts.length > 0 && (
              <TouchableOpacity onPress={confirmClear}>
                <Text style={styles.clearText}>Clear all</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        // [UI] Shown when there are no attempts yet
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Results Yet</Text>
            <Text style={styles.emptyText}>Answer a quiz and it will show up here.</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Quizzes")}
            >
              <Text style={styles.buttonText}>GO TO QUIZZES</Text>
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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: { fontSize: 32, fontWeight: "900", color: "#111827" },
  subtitle: { color: "#6B7280", marginTop: 5 },
  clearText: { color: "#DC2626", fontWeight: "800", marginTop: 10 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardTop: { flexDirection: "row", alignItems: "center" },
  cardContent: { flex: 1 },

  cardActions: { flexDirection: "row", gap: 8, marginTop: 14 },
  viewButton: {
    flex: 1,
    backgroundColor: "#111827",
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: "center",
  },
  viewButtonText: { color: "#FFFFFF", fontWeight: "900", fontSize: 12, letterSpacing: 1 },
  deleteButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#DC2626",
    paddingVertical: 9,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteButtonText: { color: "#DC2626", fontWeight: "900", fontSize: 12, letterSpacing: 1 },
  cardTitle: { fontSize: 16, fontWeight: "800", color: "#111827" },
  cardMeta: { color: "#6B7280", fontSize: 12, marginTop: 4, fontWeight: "600" },

  badge: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, marginLeft: 10 },
  goodBadge: { backgroundColor: "#DCFCE7" },
  badBadge: { backgroundColor: "#FEE2E2" },
  badgeText: { fontSize: 15, fontWeight: "900" },
  goodText: { color: "#15803D" },
  badText: { color: "#B91C1C" },

  emptyContainer: { alignItems: "center", paddingTop: 60 },
  emptyTitle: { fontSize: 25, fontWeight: "900", color: "#111827" },
  emptyText: { color: "#6B7280", marginTop: 8, marginBottom: 20 },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 13,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "900" },
});
