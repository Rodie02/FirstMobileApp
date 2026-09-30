import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.smallTitle}>STUDENT TOOL</Text>
            <Text style={styles.appTitle}>Quiz App</Text>
          </View>

          <View style={styles.logo}>
            <Text style={styles.logoText}>Q</Text>
          </View>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>Q</Text>
          </View>

          <Text style={styles.welcomeSmall}>WELCOME TO</Text>

          <Text style={styles.welcomeTitle}>
            Quiz App
          </Text>

          <Text style={styles.welcomeDescription}>
            Create questions, answer quizzes, and check
            submitted answers in one simple application.
          </Text>
        </View>

        {/* Choose Role */}
        <Text style={styles.sectionTitle}>
          Choose Your Role
        </Text>

        {/* Quiz Maker */}
        <TouchableOpacity
          style={styles.roleCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Maker")}
        >
          <View style={styles.roleIcon}>
            <Text style={styles.roleIconText}>+</Text>
          </View>

          <View style={styles.roleContent}>
            <Text style={styles.roleTitle}>
              Quiz Maker
            </Text>

            <Text style={styles.roleDescription}>
              Create and post questions for another user.
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Quiz Taker */}
        <TouchableOpacity
          style={styles.roleCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Answer")}
        >
          <View style={styles.roleIcon}>
            <Text style={styles.roleIconText}>✓</Text>
          </View>

          <View style={styles.roleContent}>
            <Text style={styles.roleTitle}>
              Quiz Taker
            </Text>

            <Text style={styles.roleDescription}>
              Answer questions posted by the quiz maker.
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Submitted Answers */}
        <TouchableOpacity
          style={styles.resultCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Results")}
        >
          <View style={styles.resultIcon}>
            <Text style={styles.resultIconText}>✓</Text>
          </View>

          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>
              Submitted Answers
            </Text>

            <Text style={styles.resultDescription}>
              View the answers submitted by the quiz taker.
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Create • Answer • Review
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
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  smallTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
    letterSpacing: 2,
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    marginTop: 3,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },

  welcomeCard: {
    backgroundColor: "#111827",
    borderRadius: 25,
    padding: 28,
    marginBottom: 28,
  },

  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },

  iconText: {
    fontSize: 27,
    fontWeight: "900",
    color: "#111827",
  },

  welcomeSmall: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    marginTop: 5,
  },

  welcomeDescription: {
    color: "#D1D5DB",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  roleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  roleIconText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },

  roleContent: {
    flex: 1,
  },

  roleTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },

  roleDescription: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 19,
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  resultIconText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#047857",
  },

  resultContent: {
    flex: 1,
  },

  resultTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },

  resultDescription: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 19,
  },

  arrow: {
    fontSize: 28,
    color: "#9CA3AF",
    marginLeft: 8,
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 15,
    letterSpacing: 1,
  },
});