const {createApp, ref, computed} = Vue;
const App = {
    setup() {
        let message = ref('Hello');
        let age = ref(null);
        let canDrive = computed(
            () => {
                console.log('Computed!');
                return age.value >= 18 ? 'Yes' : 'No';
            }
        );

        setTimeout(
            () => {
                console.log('Changed!');
                message.value = 'Bye!';
                age.value = 24;
            },
            5000
        )

        return {
            message,
            canDrive,
            age
        }
    },
};
createApp(App).mount('#app');