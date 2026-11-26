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
  Alert,
} from "react-native";
import { useQuiz } from "./QuizContext";
import { formatDate, formatTime } from "./helpers";

export default function HistoryScreen({ navigation }) {
  const { attempts, clearAttempts } = useQuiz();

  const confirmClear = () => {
    Alert.alert("Clear history?", "All submitted results will be removed.", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: clearAttempts },
    ]);
  };

  const renderAttempt = ({ item }) => {
    const passed = item.percentage >= 75;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
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
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={attempts}
        keyExtractor={(item) => item.id}
        renderItem={renderAttempt}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
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
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardContent: { flex: 1 },
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
