const {createApp, ref, computed} = Vue;
const App = {
    setup() {
        let message = ref('-');
        let age = ref(null);
        let canDrive = computed(() => {
            if (!age.value) message.value = '-';
            else if (age.value >= 18) message.value = 'Congratulations! You are ready to take a course!';
            else message.value = 'You are not ready to take a course!';

            return age.value >= 18
        });
        return {
            message,
            canDrive,
            age
        }
    },
};
createApp(App).mount('#app');