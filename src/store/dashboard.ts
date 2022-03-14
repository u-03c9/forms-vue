import { nanoid } from "nanoid";
import { defineStore } from "pinia";

export interface Question {
  id: string;
  type: string;
  header: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  value: string;
}

interface QuestionType {
  id: string;
  name: string;
  icon: string;
}

export interface Dashboard {
  title: string;
  description: string;
  selectedCard: string;
  questions: Question[];
  questionTypes: QuestionType[];
}

export const useDashboardStore = defineStore("dashboard", {
  state: (): Dashboard => {
    return {
      title: "Untitled form",
      description: "",
      selectedCard: "",
      questions: [],
      questionTypes: [
        {
          id: "choice",
          name: "Multiple choice",
          icon: "radio_button_checked",
        },
        {
          id: "check",
          name: "Checkboxes",
          icon: "check_box",
        },
        {
          id: "drop",
          name: "Dropdown",
          icon: "expand_circle_down",
        },
      ],
    };
  },
  getters: {},
  actions: {
    setSelectedCard(value: string) {
      this.selectedCard = value;
    },
    checkIsSelected(cardId: string): boolean {
      return this.selectedCard === cardId;
    },
    // --- Questions ---
    addNewQuestion(type?: string): Question {
      const newQuestion = {
        id: nanoid(),
        type: type ?? "choice",
        header: "",
        answers: [],
      };
      this.questions.push(newQuestion);
      return newQuestion;
    },
    getQuestionById(questionId: string): Question {
      return this.questions.find(
        (question: Question) => question.id === questionId
      )!;
    },
    // --- Answers ---
    getAllAnswers(questionId: string): Answer[] {
      return this.getQuestionById(questionId).answers;
    },
    getAnswerById(questionId: string, answerId: string): Answer {
      return this.getQuestionById(questionId).answers.find(
        ({ id }) => id === answerId
      )!;
    },
    findAnswerIndexById(questionId: string, answerId: string): number {
      return this.getQuestionById(questionId).answers.findIndex(
        ({ id }) => id === answerId
      );
    },
    findAnswerIndex(question: Question, answerId: string): number {
      return question.answers.findIndex(({ id }) => id === answerId);
    },
    addAnswer(questionId: string, value: string) {
      this.getQuestionById(questionId).answers.push({ id: nanoid(), value });
    },
    deleteAnswer(questionId: string, answerId: string) {
      const question = this.getQuestionById(questionId);
      question.answers.splice(this.findAnswerIndex(question, answerId), 1);
    },
    dropAnswerBefore(
      questionId: string,
      beforeIndex: number,
      answerId: string
    ) {
      const question = this.getQuestionById(questionId);
      const answerIndex = question.answers.findIndex(
        (answer) => answer.id === answerId
      );
      const answer = question.answers[answerIndex];
      question.answers.splice(answerIndex, 1);

      if (beforeIndex === -1) {
        question.answers.push(answer);
      } else {
        question.answers.splice(beforeIndex, 0, answer);
      }
    },
  },
});
