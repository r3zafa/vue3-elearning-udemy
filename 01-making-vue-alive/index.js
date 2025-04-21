const { createApp, ref, computed } = Vue;

const App = {
    setup() {
        // constants
        const textInput = [
            "block", "w-full", "p-4", "border", 
            "border-gray-300", "text-gray-900",
            "bg-gray-100", "rounded-lg", "text-base",
            "focus:ring-blue-500", "focus:border-blue-500", 
            "focus:bg-blue-100", "dark:bg-gray-700",
            "dark:border-gray-600", "dark:placeholder-gray-400",
            "dark:text-white", "dark:focus:ring-blue-500", "dark:focus:border-blue-500"
        ];

        const labelClasses = [
            "text-base", "text-lg/4", "font-medium", 
            "text-gray-900", "dark:text-white"
        ];

        const resultHeadingClasses = [
            "text-base", "text-lg/4", "font-medium", 
            "text-gray-500", "dark:text-gray-400"
        ];
        
        // vars
        let message = ref('-');
        let age = ref(null);

        // computed
        let canDrive = computed(() => {
            if (!age.value) message.value = '-';
            else if (age.value >= 18) message.value = 'Congratulations! You are ready to take a course!';
            else message.value = 'You are not ready to take a course!';
            return age.value >= 18;
        });

        let resultTextClasses = computed(() => (
            canDrive.value ? 
            ['text-green-700', 'dark:text-green-500'] : 
            ['text-red-600', 'dark:text-red-400']
        ));

        return {
            message,
            canDrive,
            age,
            textInput,
            labelClasses,
            resultHeadingClasses,
            resultTextClasses
        };
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


const bodyClasses = [
    "min-h-screen", "min-w-screen", "flex", 
    "flex-col", "justify-start", "items-start", 
    "bg-white", "dark:bg-gray-800", "text-gray-900", 
    "dark:text-white"
];

const navClasses = [
    "bg-gray-100", "dark:bg-gray-700", "w-full", 
    "px-12", "py-6", "flex", "justify-between", 
    "items-center", "shadow-md"
];

const modeBtnClasses = [
    "h-12", "w-12", "rounded-lg", "p-2", 
    "text-violet-700", "hover:bg-violet-700", "hover:text-gray-100", 
    "dark:text-yellow-500", "dark:hover:bg-yellow-500", "dark:hover:text-gray-700", 
    "transition", "duration-200", "ease-in-out"
];


document.querySelector('.body').classList.add(...bodyClasses);
document.querySelector('.nav').classList.add(...navClasses);
document.querySelector('.mode-btn').classList.add(...modeBtnClasses);


