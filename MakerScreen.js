import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

export default function MakerScreen({ navigation, onCreateQuiz }) {
  const createEmptyQuestion = () => ({
    id: Date.now() + Math.random(),
    type: "Multiple Choice",
    question: "",
    choices: ["", "", "", ""],
    correctAnswer: "",
  });

  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    createEmptyQuestion(),
  ]);

  const questionTypes = [
    "Multiple Choice",
    "Identification",
    "Enumeration",
    "Essay",
  ];

  const updateQuestion = (id, field, value) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const updateChoice = (id, choiceIndex, value) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const updatedChoices = [...item.choices];
        updatedChoices[choiceIndex] = value;

        return {
          ...item,
          choices: updatedChoices,
        };
      })
    );
  };

  const changeQuestionType = (id, type) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((item) =>
        item.id === id
          ? {
              ...item,
              type: type,
              correctAnswer: "",
            }
          : item
      )
    );
  };

  const selectCorrectAnswer = (id, answer) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((item) =>
        item.id === id
          ? {
              ...item,
              correctAnswer: answer,
            }
          : item
      )
    );
  };

  const addQuestion = () => {
    setQuestions((currentQuestions) => [
      ...currentQuestions,
      createEmptyQuestion(),
    ]);
  };

  const removeQuestion = (id) => {
    if (questions.length === 1) {
      alert("You need at least one question.");
      return;
    }

    setQuestions((currentQuestions) =>
      currentQuestions.filter((item) => item.id !== id)
    );
  };

  const postQuiz = () => {
    if (quizTitle.trim() === "") {
      alert("Please enter a quiz title.");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const item = questions[i];

      if (item.question.trim() === "") {
        alert(`Please enter Question ${i + 1}.`);
        return;
      }

      if (item.type === "Multiple Choice") {
        const hasEmptyChoice = item.choices.some(
          (choice) => choice.trim() === ""
        );

        if (hasEmptyChoice) {
          alert(
            `Please complete all choices for Question ${i + 1}.`
          );
          return;
        }

        if (item.correctAnswer === "") {
          alert(
            `Please select the correct answer for Question ${i + 1}.`
          );
          return;
        }
      } else {
        if (item.correctAnswer.trim() === "") {
          alert(
            `Please enter the correct answer for Question ${i + 1}.`
          );
          return;
        }
      }
    }

    const quiz = {
      id: Date.now().toString(),
      title: quizTitle.trim(),
      questions: questions.map((item, index) => ({
        id: item.id,
        number: index + 1,
        type: item.type,
        question: item.question.trim(),
        choices:
          item.type === "Multiple Choice"
            ? item.choices.map((choice) => choice.trim())
            : [],
        correctAnswer: item.correctAnswer.trim(),
      })),
    };

    onCreateQuiz(quiz);

    alert("Quiz posted successfully!");

    navigation.navigate("Answer");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Quiz Maker</Text>

        <Text style={styles.subtitle}>
          Create a quiz with multiple questions.
        </Text>

        <View style={styles.titleCard}>
          <Text style={styles.label}>QUIZ TITLE</Text>

          <TextInput
            style={styles.titleInput}
            placeholder="Example: Science Quiz"
            placeholderTextColor="#9CA3AF"
            value={quizTitle}
            onChangeText={setQuizTitle}
          />
        </View>

        {questions.map((item, index) => (
          <View style={styles.questionCard} key={item.id}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionNumber}>
                QUESTION {index + 1}
              </Text>

              {questions.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeQuestion(item.id)}
                >
                  <Text style={styles.removeText}>
                    Remove
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.label}>
              QUESTION TYPE
            </Text>

            <View style={styles.typeContainer}>
              {questionTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    item.type === type &&
                      styles.selectedType,
                  ]}
                  onPress={() =>
                    changeQuestionType(item.id, type)
                  }
                >
                  <Text
                    style={[
                      styles.typeText,
                      item.type === type &&
                        styles.selectedTypeText,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>
              QUESTION
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your question"
              placeholderTextColor="#9CA3AF"
              value={item.question}
              onChangeText={(value) =>
                updateQuestion(
                  item.id,
                  "question",
                  value
                )
              }
              multiline
            />

            {item.type === "Multiple Choice" && (
              <View>
                <Text style={styles.label}>
                  ANSWER CHOICES
                </Text>

                <Text style={styles.hint}>
                  Tap the circle beside the correct answer.
                </Text>

                {item.choices.map((choice, choiceIndex) => (
                  <View
                    style={[
                      styles.choiceRow,
                      item.correctAnswer === choice &&
                        choice.trim() !== "" &&
                        styles.correctChoice,
                    ]}
                    key={choiceIndex}
                  >
                    <TouchableOpacity
                      style={styles.radioButton}
                      onPress={() =>
                        selectCorrectAnswer(
                          item.id,
                          choice
                        )
                      }
                    >
                      {item.correctAnswer === choice &&
                        choice.trim() !== "" && (
                          <Text style={styles.check}>
                            ✓
                          </Text>
                        )}
                    </TouchableOpacity>

                    <TextInput
                      style={styles.choiceInput}
                      placeholder={`Choice ${String.fromCharCode(
                        65 + choiceIndex
                      )}`}
                      placeholderTextColor="#9CA3AF"
                      value={choice}
                      onChangeText={(value) =>
                        updateChoice(
                          item.id,
                          choiceIndex,
                          value
                        )
                      }
                    />
                  </View>
                ))}
              </View>
            )}

            {item.type === "Identification" && (
              <View>
                <Text style={styles.label}>
                  CORRECT ANSWER
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter the correct answer"
                  placeholderTextColor="#9CA3AF"
                  value={item.correctAnswer}
                  onChangeText={(value) =>
                    updateQuestion(
                      item.id,
                      "correctAnswer",
                      value
                    )
                  }
                />
              </View>
            )}

            {item.type === "Enumeration" && (
              <View>
                <Text style={styles.label}>
                  CORRECT ANSWER
                </Text>

                <TextInput
                  style={[styles.input, styles.largeInput]}
                  placeholder="Example: Solid, Liquid, Gas"
                  placeholderTextColor="#9CA3AF"
                  value={item.correctAnswer}
                  onChangeText={(value) =>
                    updateQuestion(
                      item.id,
                      "correctAnswer",
                      value
                    )
                  }
                  multiline
                />

                <Text style={styles.hint}>
                  Separate multiple answers with commas.
                </Text>
              </View>
            )}

            {item.type === "Essay" && (
              <View>
                <Text style={styles.label}>
                  CORRECT ANSWER / REFERENCE ANSWER
                </Text>

                <TextInput
                  style={[styles.input, styles.largeInput]}
                  placeholder="Enter the expected or reference answer"
                  placeholderTextColor="#9CA3AF"
                  value={item.correctAnswer}
                  onChangeText={(value) =>
                    updateQuestion(
                      item.id,
                      "correctAnswer",
                      value
                    )
                  }
                  multiline
                />

                <Text style={styles.hint}>
                  This will be used as the reference answer.
                </Text>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={addQuestion}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>
            + ADD QUESTION
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          onPress={postQuiz}
          activeOpacity={0.8}
        >
          <Text style={styles.postButtonText}>
            POST QUIZ
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          {questions.length}{" "}
          {questions.length === 1
            ? "question"
            : "questions"}{" "}
          in this quiz
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

  backButton: {
    marginBottom: 15,
  },

  backText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "700",
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#111827",
  },

  subtitle: {
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 20,
  },

  titleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  questionNumber: {
    fontSize: 13,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: 1,
  },

  removeText: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "800",
  },

  label: {
    fontSize: 11,
    fontWeight: "900",
    color: "#6B7280",
    letterSpacing: 1.3,
    marginTop: 12,
    marginBottom: 9,
  },

  titleInput: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 13,
    padding: 14,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },

  typeButton: {
    paddingVertical: 9,
    paddingHorizontal: 11,
    borderRadius: 11,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  selectedType: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  typeText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 11,
  },

  selectedTypeText: {
    color: "#FFFFFF",
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 13,
    padding: 14,
    fontSize: 15,
    color: "#111827",
    minHeight: 52,
    textAlignVertical: "top",
  },

  largeInput: {
    minHeight: 100,
  },

  hint: {
    color: "#6B7280",
    fontSize: 11,
    lineHeight: 17,
    marginBottom: 8,
  },

  choiceRow: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 13,
    padding: 7,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  correctChoice: {
    borderColor: "#111827",
    borderWidth: 2,
  },

  radioButton: {
    width: 31,
    height: 31,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  check: {
    fontSize: 17,
    fontWeight: "900",
    color: "#111827",
  },

  choiceInput: {
    flex: 1,
    padding: 9,
    fontSize: 14,
    color: "#111827",
  },

  addButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#111827",
    borderStyle: "dashed",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 5,
  },

  addButtonText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "900",
  },

  postButton: {
    backgroundColor: "#111827",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 14,
  },

  postButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 15,
  },
});