const {createApp, ref, computed} = Vue;
const App = {
    setup() {
        // constants
        const inputClasses = "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 " +
            "text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 " +
            "dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

        // vars
        let message = ref('-');
        let age = ref(null);

        // computed
        let canDrive = computed(() => {
            if (!age.value) message.value = '-';
            else if (age.value >= 18) message.value = 'Congratulations! You are ready to take a course!';
            else message.value = 'You are not ready to take a course!';

            return age.value >= 18
        });

        return {
            message,
            canDrive,
            age,
            inputClasses,
        }
    },
};
createApp(App).mount('#app');

function modeSwitch() {
    document.body.classList.toggle('dark');
    console.log('##');
}