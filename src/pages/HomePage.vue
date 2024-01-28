<template>
  <q-page class="home-background">
    <div class="buttons-container">
      <q-card-section>
  <span style="font-size: 24px;font-weight: bold;">Menu </span> <!-- Adjust font-size as needed -->
  <span
    style="background-color: rgba(210, 128, 5, 0.3); padding: 5px 5px; border-radius: 10px; font-size: 24px;font-weight: bold;">
    Principal
  </span>
</q-card-section>


      <q-btn
        to="/buy-electricity"
        unelevated
        label="Comprar Energia"
        class="full-width bg-black text-white"
        color="orange"
        rounded
        size="xl"
        no-caps
      >
      </q-btn>
      <q-btn
       to="/last-recharge"
        unelevated
        class="full-width bg-primary text-black"
        label="Última Recarga"
        color="white"
        rounded
        size="xl"
        no-caps
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  // ... other options if necessary ...
});
</script>

<style>
.full-width {
  width: 100%;
}

.home-background {
  display: flex; /* Enable Flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  text-align: center; /* Center text for all child elements */
  background: url("images/funaebg.png") no-repeat center center;
  background-size: cover; /* Cover the entire page */
  min-height: 100vh; /* Ensure it covers full viewport height */
}

.buttons-container {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  gap: 16px; /* Space between buttons, similar to 'q-gutter-y-md' */
  max-width: 500px; /* Same as your previous max-width */
  width: 100%; /* Make it full width */
}

/* Add your other styles here */
</style>
