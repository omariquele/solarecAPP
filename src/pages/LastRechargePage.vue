<template>
  <q-layout>
    <q-page-container>
      <q-page class="home-background">
        <div
          class="q-pa-lg q-gutter-y-lg"
          style="max-width: 500px; margin: 0 auto"
        >
          <q-card-section>
            <span style="font-size: 24px; font-weight: bold">Última </span>
            <span
              style="
                background-color: rgba(210, 128, 5, 0.3);
                padding: 5px 5px;
                border-radius: 10px;
                font-size: 24px;
                font-weight: bold;
              "
            >
              Recarga
            </span>
          </q-card-section>


      <!-- Formulario de compra de agua-->
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          color="black"
          bg-color="grey-1"
          outlined
          v-model="meter_number"
          type="number"
          label="Inserir o número de contador"
          lazy-rules
          input-style="font-size: 20pt"
          :rules="[ val => val && val.length > 0 || 'Por favor, insira o número de contador']"
        />

        <div class="q-gutter-y-md">
          <q-btn
            type="submit"
            unelevated
            label="Visualizar"
            color="black"
            rounded
            size="xl"
            no-caps
            class="full-width"
          />

          <q-btn
                @click="goBack"
                flat
                icon="arrow_left"
                label="Voltar"
                color="white"
                rounded
                size="xl"
                no-caps
                class="full-width"
              />
        </div>

      </q-form>


    </div>
  </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar, QSpinnerGears } from "quasar"; // Import useQuasar
import { useAppStore } from "stores/app-store";



export default defineComponent({
  name: 'LastRechargePage',
  setup () {
    const $q = useQuasar()
    const appStore = useAppStore()

    const meter_number = ref(null)
    const notSpinner = ref(true)

    const router = useRouter()

    const handleShowLoading = () => {
        showLoading()
    }

    const showLoading =() =>{

        const dialog = $q.dialog({
            title: 'A processar a última recarga comprada...',
            color: 'white',
            message: '0%',
            class: "bg-white text-black",
            progress: {
                spinner: QSpinnerGears,
                color: 'black'
            },
            persistent: true, // we want the user to not be able to close it
            ok: false // we want the user to not be able to close it
        })

          // we simulate some progress here...
          let percentage = 0
          const interval = setInterval(() => {
              percentage = Math.min(100, percentage + Math.floor(Math.random() * 22))

              // we update the dialog
              dialog.update({
                  message: `${percentage}%`
              })

              // if we are done...
              if (percentage === 100) {
                  percentage = 0
              }

              if (appStore.isProcessingPayment === 'success') {

                  clearInterval(interval)
                  appStore.resetProcessing()

                  router.push('/pre-pay/display/last-recharge')

                  dialog.update({
                      title: 'Concluido!',
                      message: 'Última recarga recuperada',
                      progress: false,
                      ok: true
                  })

                  setTimeout(()=>{
                      dialog.hide()
                  }, 5000)

              }
              if (appStore.isProcessingPayment === 'error') {

                  clearInterval(interval)
                  appStore.resetProcessing()

                  dialog.hide()

              }

          }, 500)


      };
      const goBack = () => {
      router.push({ name: "home" }); // navigate to home
    };

    return {
      meter_number,
      notSpinner,
      router,
      appStore,
      goBack, // Make sure this is included

      onSubmit () {

          handleShowLoading()

          appStore.getLastRecharge(meter_number.value)

      },

    }
  }
})
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
</style>
