<template>
  <q-layout>
    <splash-screen v-if="showSplash" @finished="() => showSplash = false" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SplashScreen from 'components/SplashScreen.vue';
import { ref, onMounted } from 'vue';

export default {
  components: {
    SplashScreen
  },
  setup() {
    const showSplash = ref(true);

    // When the component is first mounted
    onMounted(() => {
      // Check if the splash screen has already been shown in this session
      if (sessionStorage.getItem('splashShown')) {
        // If shown, don't show it again
        showSplash.value = false;
      } else {
        // If not shown, display it and set a flag in sessionStorage
        setTimeout(() => {
          showSplash.value = false;
          sessionStorage.setItem('splashShown', 'true');
        }, 5000); // Hide splash screen after 5 seconds
      }
    });

    return {
      showSplash,
    };
  },
};
</script>
