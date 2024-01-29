<template>
  <div class="bg-image-container">
    <img
      src="images/funaebg.png"
      alt=""
      :style="imageStyle"
    >
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'BgImageComponent',
  setup() {
    const quasarInstance = useQuasar();

    const imageStyle = computed(() => ({
      height: '100%',
      opacity: '0.8',
      width: `${quasarInstance.screen.width > 500 && quasarInstance.screen.width < 1400 ? 135 : quasarInstance.screen.width > 1400 ? 122 : 100}%`,
    }));

    return {
      quasarInstance,
      imageStyle,
    };
  },
});
</script>

<style scoped>
.bg-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensures the image stays behind the content */
}

.bg-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* This will ensure the aspect ratio is maintained */
}
</style>
