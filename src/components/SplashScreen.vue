<template>
  <div class="splash-screen">
    <div class="content">
      <!-- Your splash content here, e.g., logo or app name -->
      <img src="images/funaebg.png" alt="Logo" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SplashScreen",
  mounted() {
    setTimeout(() => {
      this.$emit("finished");
    }, 5000); // Hide splash screen after 5 seconds
  },
};
</script>

<style>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c97303; /* or any color you prefer */
  z-index: 9999; /* Ensure it's above everything */
  opacity: 0.9; /* Adjust the opacity */
}

.content {
  text-align: center; /* Center the text horizontally */
}

.splash-text {
  margin-top: 20px; /* Adjust the space between the image and the text */
  font-size: 24px; /* Adjust the size of the text */
  color: #333; /* Adjust the color of the text */
  /* Add more styling as needed */
}
</style>
