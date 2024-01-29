<template>
  <q-page class="content-container">
    <BgImageComponent />

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
        class="full-width bg-black text-white btn-outline"
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
import BgImageComponent from "components/BgImageComponent.vue"; // Update this path based on your directory structure

export default defineComponent({
  name: "HomePage",
  components: {
    BgImageComponent, // Registering the component
  },
  // ... other options if necessary ...
});
</script>

<style>
.full-width {
  width: 100%;
}


.buttons-container {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  gap: 16px; /* Space between buttons, similar to 'q-gutter-y-md' */
  max-width: 500px; /* Same as your previous max-width */
  width: 70%; /* Make it full width */
  margin: 0 auto; /* Centers horizontally in the content-container */
}

.content-container {
  position: relative;
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  text-align: center;
  min-height: 100vh; /* Takes the full height of the viewport */
}
.btn-outline {
  border: 1px solid black; /* Adjust thickness as needed */
  position: relative;
}
/* Add your other styles here */
</style>
