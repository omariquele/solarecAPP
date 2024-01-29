<template>
  <q-layout>
    <q-page-container>
      <q-page class="content-container">
           <BgImageComponent />

            <q-card-section class="card-section">
             <span class="section-title compra-title">Compra</span>
             <span class="section-subtitle">Energia</span>
            </q-card-section>

          <q-form @submit="onSubmit" class="form-container">
            <q-input
              color="black"
              bg-color="grey-1"
              outlined
              v-model="contador"
              type="number"
              label="Inserir o número de contador"
              lazy-rules
              input-style="font-size: 20pt"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor, insira o número de contador',
              ]"
            />

            <q-input
              color="black"
              bg-color="grey-1"
              outlined
              type="number"
              v-model="amount"
              input-style="font-size: 20pt"
              label="Inserir o valor"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Insira o valor da recarga',
              ]"
            />

            <div class="q-gutter-y-md">
              <q-btn
                type="submit"
                unelevated
                label="Comprar"
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

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar, QSpinnerGears } from "quasar"; // Import useQuasar
import { useAppStore } from "stores/app-store";
import BgImageComponent from "components/BgImageComponent.vue"; // Update this path based on your directory structure


export default defineComponent({
  name: "BuyElectricityPage, BgImageComponent",
  setup() {
    const $q = useQuasar(); // Use useQuasar
    const appStore = useAppStore();
    const contador = ref(null);
    const amount = ref(null);

    const notSpinner = ref(true);
    const router = useRouter(); // create router instance

    const handleShowLoading = () => {
      showLoading();
    };

    const showLoading = () => {
      const dialog = $q.dialog({
        title: "Aguarde, a processar detalhes...",
        color: "white",
        message: "0%",
        class: "bg-white text-black",
        progress: {
          spinner: QSpinnerGears,
          color: "black",
        },
        persistent: true, // we want the user to not be able to close it
        ok: false, // we want the user to not be able to close it
      });

      // we simulate some progress here...
      let percentage = 0;
      const interval = setInterval(() => {
        percentage = Math.min(100, percentage + Math.floor(Math.random() * 22));

        // we update the dialog
        dialog.update({
          message: `${percentage}%`,
        });

        // if we are done...
        if (percentage === 100) {
          percentage = 0;
        }

        if (appStore.isProcessingPayment === "success") {
          clearInterval(interval);
          appStore.resetProcessing();

          router.push("/pre-pay/recharge/confirm-details");

          dialog.update({
            title: "Concluido!",
            message: "Confirme a informação e prossiga com o pagamento",
            progress: false,
            ok: true,
          });

          setTimeout(() => {
            dialog.hide();
          }, 5000);
        }
        if (appStore.isProcessingPayment === "error") {
          clearInterval(interval);
          appStore.resetProcessing();

          // dialog.update({
          //     title: 'Ocorreu um erro!',
          //     message: 'Corriga os erros, e tente novamente',
          //     progress: false,
          //     ok: true
          // })
          //
          // setTimeout(()=>{
          dialog.hide();
          // }, 5000)
        }
      }, 500);
    };

    const goBack = () => {
      router.push({ name: "home" }); // navigate to home
    };

    return {
      contador,
      amount,
      notSpinner,
      router,
      appStore,

      onSubmit() {
        const payload = {
          meter_number: contador.value,
          amount: amount.value,
        };

        // TODO: Por mostrar o processamento enquanto busca os dados do servidor

        handleShowLoading();

        appStore.setRechargesResponse(payload).then((itemObject) => {
          console.log("Retorned has response: ", itemObject);

          if (!(itemObject.status && itemObject.status === "error")) {
            console.error("Redirecting...");
            router.push("/buy-electricity");
          } else {
            console.error("Not redirected...");
          }
        });
      },
      goBack, // add goBack to the returned object
    };
  },
});
</script>

<style>
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  text-align: center;
  min-height: 100vh;
}

.card-section {
  margin-bottom: 20px; /* Add space between card-section and form */
}

.section-title,
.section-subtitle {
  font-size: 24px;
  font-weight: bold;
  background-color: rgba(210, 128, 5, 0.3);
  padding: 5px 5px;
  border-radius: 10px;
}

.compra-title {
  /* Add specific styles for "Compra" */
  font-size: 28px; /* Slightly larger */
  font-weight: bold; /* Make it bold */
  color: #000; /* Set the color */
  background-color: white
}

.section-subtitle {
  margin-left: 10px; /* Add space between titles */
}

.form-container {
  width: 85%;
  max-width: 500px; /* Adjust as needed */
  margin: 0 auto;
}

.full-width {
  width: 100%;
}
</style>


