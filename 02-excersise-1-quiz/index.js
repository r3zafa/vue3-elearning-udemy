const { createApp, ref, computed } = Vue;

const App = {
  setup() {
    // constants
    const textInputClass = [
      "block",
      "w-full",
      "p-4",
      "border",
      "border-gray-300",
      "text-gray-900",
      "bg-gray-100",
      "rounded-lg",
      "text-base",
      "focus:ring-blue-500",
      "focus:border-blue-500",
      "focus:bg-blue-100",
      "dark:bg-gray-700",
      "dark:border-gray-600",
      "dark:placeholder-gray-400",
      "dark:text-white",
      "dark:focus:ring-blue-500",
      "dark:focus:border-blue-500",
    ];

    const questions = ref([
      "How much is 2+2",
      "How much is 3*5+1",
      "What is the rest from 3/1",
    ]);

    const answers = ref(["4", "16", "1"]);
    const currentIndex = ref(0);
    const currentAnswer = ref(null);
    const answered = ref([]);

    const correctAnswer = computed(() => {
      return answered.value.reduce((count, answer, index) => {
        return count + (answer === answers.value[index] ? 1 : 0);
      }, 0);
    });

    const wrongAnswer = computed(() => {
      return answered.value.reduce((count, answer, index) => {
        return (
          count +
          (answer !== answers.value[index] && answer !== undefined ? 1 : 0)
        );
      }, 0);
    });

    const currentQuestion = computed(() => {
      if (currentIndex.value < 0) {
        return "no question found";
      }
      if (currentIndex.value >= questions.value.length) {
        return "you finished the quiz";
      }
      return questions.value[currentIndex.value];
    });

    function nextQuestionFn() {
      if (currentIndex.value < questions.value.length - 1) {
        currentIndex.value++;
      } else {
        currentIndex.value = questions.value.length; // Set index beyond the last question
      }
    }

    function restartQuiz() {
      currentIndex.value = 0;
      answered.value = [];
      currentAnswer.value = null;
    }

    function submitAnswer() {
      if (currentAnswer.value !== null) {
        answered.value[currentIndex.value] = currentAnswer.value;
        currentAnswer.value = null;
        nextQuestionFn();
      }
    }

    function isCorrectAnswer(answer, index) {
      return answered.value[index] === answers.value[index];
    }

    return {
      textInputClass,
      questions,
      answers,
      correctAnswer,
      wrongAnswer,
      answered,
      submitAnswer,
      currentIndex,
      currentAnswer,
      currentQuestion,
      restartQuiz,
      isCorrectAnswer,
    };
  },
};
createApp(App).mount("#app");
