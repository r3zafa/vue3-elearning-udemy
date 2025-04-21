const {createApp, ref, computed} = Vue;
const App = {
    setup() {
        // constants
        const inputClasses = "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-100 " +
            "text-base focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-100 dark:bg-gray-700 dark:border-gray-600 " +
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
    const htmlElement = document.documentElement;

    // Check if the user has already set a preference
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light'); // Save preference
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark'); // Save preference
    }
}

// Apply the saved theme on page load
(function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        // Apply the saved theme (manual preference takes precedence)
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
        // Default to system preference if no saved theme exists
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
    }

    // Listen for system theme changes and apply them only if no manual preference exists
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.classList.toggle('dark', e.matches);
        }
    });
})();