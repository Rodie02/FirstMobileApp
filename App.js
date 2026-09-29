import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";

export default function App() {
  const [screen, setScreen] = useState("home");

  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [question, setQuestion] = useState("");

  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");

  const [postedQuestion, setPostedQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState(null);

  const questionTypes = [
    "Multiple Choice",
    "Identification",
    "Enumeration",
    "Essay",
  ];

  const postQuestion = () => {
    if (question.trim() === "") {
      alert("Please enter a question.");
      return;
    }

    const newQuestion = {
      type: questionType,
      question: question,
      choices: [choiceA, choiceB, choiceC, choiceD],
    };

    setPostedQuestion(newQuestion);
    setSubmittedAnswer(null);
    setAnswer("");
    setScreen("answer");
  };

  const submitAnswer = () => {
    if (answer.trim() === "") {
      alert("Please enter an answer.");
      return;
    }

    setSubmittedAnswer(answer);
    alert("Answer submitted successfully!");
  };

  const clearQuiz = () => {
    setQuestion("");
    setChoiceA("");
    setChoiceB("");
    setChoiceC("");
    setChoiceD("");
    setAnswer("");
    setPostedQuestion(null);
    setSubmittedAnswer(null);
  };

  const renderChoicesForMaker = () => {
    if (questionType !== "Multiple Choice") {
      return null;
    }

    return (
      <View>
        <Text style={styles.label}>Answer Choices</Text>

        <TextInput
          style={styles.input}
          placeholder="Choice A"
          value={choiceA}
          onChangeText={setChoiceA}
        />

        <TextInput
          style={styles.input}
          placeholder="Choice B"
          value={choiceB}
          onChangeText={setChoiceB}
        />

        <TextInput
          style={styles.input}
          placeholder="Choice C"
          value={choiceC}
          onChangeText={setChoiceC}
        />

        <TextInput
          style={styles.input}
          placeholder="Choice D"
          value={choiceD}
          onChangeText={setChoiceD}
        />
      </View>
    );
  };

  const renderAnswerArea = () => {
    if (!postedQuestion) {
      return null;
    }

    if (postedQuestion.type === "Multiple Choice") {
      return (
        <View>
          {postedQuestion.choices.map((choice, index) => {
            if (choice.trim() === "") {
              return null;
            }

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerChoice,
                  answer === choice && styles.selectedChoice,
                ]}
                onPress={() => setAnswer(choice)}
              >
                <View style={styles.radio}>
                  {answer === choice && (
                    <View style={styles.radioSelected} />
                  )}
                </View>

                <Text style={styles.choiceText}>
                  {String.fromCharCode(65 + index)}. {choice}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }

    if (postedQuestion.type === "Enumeration") {
      return (
        <TextInput
          style={styles.answerBox}
          placeholder="Enter your answers..."
          multiline
          value={answer}
          onChangeText={setAnswer}
        />
      );
    }

    if (postedQuestion.type === "Essay") {
      return (
        <TextInput
          style={[styles.answerBox, styles.essayBox]}
          placeholder="Write your essay here..."
          multiline
          textAlignVertical="top"
          value={answer}
          onChangeText={setAnswer}
        />
      );
    }

    return (
      <TextInput
        style={styles.input}
        placeholder="Type your answer..."
        value={answer}
        onChangeText={setAnswer}
      />
    );
  };

  const HomeScreen = () => (
    <View>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Text style={styles.heroIconText}>Q</Text>
        </View>

        <Text style={styles.welcomeSmall}>WELCOME TO</Text>

        <Text style={styles.heroTitle}>Quiz App</Text>

        <Text style={styles.heroDescription}>
          Create questions, answer quizzes, and view submitted answers
          in one simple app.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Choose your role</Text>

      <TouchableOpacity
        style={styles.roleCard}
        onPress={() => setScreen("maker")}
      >
        <View style={styles.roleIcon}>
          <Text style={styles.roleIconText}>+</Text>
        </View>

        <View style={styles.roleContent}>
          <Text style={styles.roleTitle}>Quiz Maker</Text>
          <Text style={styles.roleDescription}>
            Create and post questions for another user.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roleCard}
        onPress={() => setScreen("answer")}
      >
        <View style={styles.roleIcon}>
          <Text style={styles.roleIconText}>✓</Text>
        </View>

        <View style={styles.roleContent}>
          <Text style={styles.roleTitle}>Quiz Taker</Text>
          <Text style={styles.roleDescription}>
            Answer the question posted by the quiz maker.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      {submittedAnswer && (
        <TouchableOpacity
          style={styles.resultPreview}
          onPress={() => setScreen("results")}
        >
          <View>
            <Text style={styles.resultPreviewTitle}>
              Answer Submitted
            </Text>

            <Text style={styles.resultPreviewText}>
              Tap here to view the submitted answer.
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const MakerScreen = () => (
    <View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setScreen("home")}
      >
        <Text style={styles.backText}>‹ Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.introCard}>
        <Text style={styles.cardTitle}>Create a Question</Text>

        <Text style={styles.cardDescription}>
          Choose a question type and post your quiz for the other user.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Question Type</Text>

      <View style={styles.typeContainer}>
        {questionTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              questionType === type && styles.selectedType,
            ]}
            onPress={() => setQuestionType(type)}
          >
            <Text
              style={[
                styles.typeText,
                questionType === type && styles.selectedTypeText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Question</Text>

      <TextInput
        style={[styles.input, styles.questionInput]}
        placeholder="Write your question here..."
        multiline
        value={question}
        onChangeText={setQuestion}
      />

      {renderChoicesForMaker()}

      <TouchableOpacity
        style={styles.postButton}
        onPress={postQuestion}
      >
        <Text style={styles.postButtonText}>POST QUESTION</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearQuiz}
      >
        <Text style={styles.clearButtonText}>CLEAR</Text>
      </TouchableOpacity>
    </View>
  );

  const AnswerScreen = () => (
    <View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setScreen("home")}
      >
        <Text style={styles.backText}>‹ Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.introCard}>
        <Text style={styles.cardTitle}>Answer Quiz</Text>

        <Text style={styles.cardDescription}>
          Answer the question posted by the quiz maker.
        </Text>
      </View>

      {!postedQuestion ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>?</Text>

          <Text style={styles.emptyTitle}>
            No Question Posted
          </Text>

          <Text style={styles.emptyText}>
            The quiz maker has not posted a question yet.
          </Text>

          <TouchableOpacity
            style={styles.goMakerButton}
            onPress={() => setScreen("maker")}
          >
            <Text style={styles.goMakerText}>
              CREATE A QUESTION
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.questionCard}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionNumber}>
                QUESTION 01
              </Text>

              <Text style={styles.questionType}>
                {postedQuestion.type}
              </Text>
            </View>

            <Text style={styles.postedQuestion}>
              {postedQuestion.question}
            </Text>
          </View>

          <Text style={styles.answerLabel}>YOUR ANSWER</Text>

          {renderAnswerArea()}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitAnswer}
          >
            <Text style={styles.submitButtonText}>
              SUBMIT ANSWER
            </Text>
          </TouchableOpacity>

          {submittedAnswer && (
            <View style={styles.submittedCard}>
              <Text style={styles.submittedTitle}>
                ✓ Answer Submitted
              </Text>

              <Text style={styles.submittedText}>
                Your answer has been recorded.
              </Text>

              <TouchableOpacity
                style={styles.viewResultButton}
                onPress={() => setScreen("results")}
              >
                <Text style={styles.viewResultText}>
                  VIEW SUBMISSION
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );

  const ResultsScreen = () => (
    <View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setScreen("home")}
      >
        <Text style={styles.backText}>‹ Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.introCard}>
        <Text style={styles.cardTitle}>Submitted Answer</Text>

        <Text style={styles.cardDescription}>
          Review the answer submitted by the quiz taker.
        </Text>
      </View>

      {!submittedAnswer ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>!</Text>

          <Text style={styles.emptyTitle}>
            No Answer Yet
          </Text>

          <Text style={styles.emptyText}>
            The quiz taker has not submitted an answer.
          </Text>
        </View>
      ) : (
        <View>
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>QUESTION</Text>

            <Text style={styles.resultQuestion}>
              {postedQuestion.question}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.resultLabel}>QUESTION TYPE</Text>

            <Text style={styles.resultValue}>
              {postedQuestion.type}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.resultLabel}>
              SUBMITTED ANSWER
            </Text>

            <View style={styles.answerResultBox}>
              <Text style={styles.answerResultText}>
                {submittedAnswer}
              </Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                SUBMITTED
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.postAnotherButton}
            onPress={() => {
              clearQuiz();
              setScreen("maker");
            }}
          >
            <Text style={styles.postButtonText}>
              CREATE NEW QUESTION
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.smallTitle}>STUDENT TOOL</Text>
            <Text style={styles.title}>Quiz App</Text>
          </View>

          <View style={styles.logo}>
            <Text style={styles.logoText}>Q</Text>
          </View>
        </View>

        {screen === "home" && <HomeScreen />}
        {screen === "maker" && <MakerScreen />}
        {screen === "answer" && <AnswerScreen />}
        {screen === "results" && <ResultsScreen />}
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
    paddingBottom: 50,
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

  title: {
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

  hero: {
    backgroundColor: "#111827",
    borderRadius: 25,
    padding: 28,
    marginBottom: 28,
  },

  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },

  heroIconText: {
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

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    marginTop: 5,
  },

  heroDescription: {
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

  arrow: {
    fontSize: 28,
    color: "#9CA3AF",
    marginLeft: 8,
  },

  resultPreview: {
    backgroundColor: "#ECFDF5",
    borderRadius: 18,
    padding: 18,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },

  resultPreviewTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#065F46",
  },

  resultPreviewText: {
    fontSize: 12,
    color: "#047857",
    marginTop: 4,
  },

  backButton: {
    marginBottom: 18,
  },

  backText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },

  introCard: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 22,
    marginBottom: 24,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 7,
  },

  cardDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: "#D1D5DB",
  },

  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },

  typeButton: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  selectedType: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  typeText: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 13,
  },

  selectedTypeText: {
    color: "#FFFFFF",
  },

  label: {
    fontSize: 14,
    fontWeight: "800",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 15,
    color: "#111827",
    marginBottom: 12,
  },

  questionInput: {
    minHeight: 110,
    textAlignVertical: "top",
  },

  postButton: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },

  postButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 1,
  },

  clearButton: {
    alignItems: "center",
    paddingVertical: 15,
  },

  clearButtonText: {
    color: "#6B7280",
    fontWeight: "700",
    fontSize: 13,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F3F4F6",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 30,
    fontWeight: "800",
    color: "#6B7280",
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },

  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 21,
    marginBottom: 20,
  },

  goMakerButton: {
    backgroundColor: "#111827",
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 12,
  },

  goMakerText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
  },

  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 22,
  },

  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  questionNumber: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B7280",
    letterSpacing: 1,
  },

  questionType: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111827",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  postedQuestion: {
    fontSize: 21,
    lineHeight: 30,
    fontWeight: "800",
    color: "#111827",
  },

  answerLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#374151",
    marginBottom: 10,
  },

  answerChoice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },

  selectedChoice: {
    borderColor: "#111827",
    backgroundColor: "#F3F4F6",
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#111827",
  },

  choiceText: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
  },

  answerBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 15,
    minHeight: 100,
    fontSize: 15,
    color: "#111827",
    marginBottom: 15,
  },

  essayBox: {
    minHeight: 180,
  },

  submitButton: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 5,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 1,
  },

  submittedCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },

  submittedTitle: {
    color: "#065F46",
    fontSize: 17,
    fontWeight: "800",
  },

  submittedText: {
    color: "#047857",
    marginTop: 5,
    marginBottom: 15,
  },

  viewResultButton: {
    backgroundColor: "#065F46",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  viewResultText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 12,
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  resultLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6B7280",
    letterSpacing: 1,
    marginBottom: 8,
  },

  resultQuestion: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "800",
    color: "#111827",
  },

  resultValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
  },

  answerResultBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    padding: 16,
    marginTop: 5,
  },

  answerResultText: {
    color: "#111827",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },

  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#D1FAE5",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 15,
  },

  statusText: {
    color: "#065F46",
    fontSize: 11,
    fontWeight: "800",
  },

  postAnotherButton: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 18,
  },
});