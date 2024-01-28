<template>
   <q-layout>
    <q-page-container>
  <q-page class="text-center">

    <div class="q-pa-lg q-gutter-y-lg" style="max-width: 500px;margin: 0 auto">

      <page-title-component
        v-if="canShowPaymentOptions"
      >
        Meio de <span style="background-color: rgba(74,133,79,.3);padding: 5px 10px;border-radius: 5px">Pagamento</span>
      </page-title-component>

      <q-form
        class="q-gutter-md"
      >
        <!-- Detalhes da recarga-->
        <recharge-results-component :details="dynamicList"/>

        <div class="q-gutter-y-md">

          <payments-options-component
            v-if="canShowPaymentOptions"
          />

          <div v-else>
            <q-btn
              @click="handleShowPaymentsOpts"
              unelevated
              label="Pagar"
              color="primary"
              rounded
              size="lg"
              no-caps
              class="full-width"
            />
          </div>

          <div class="">

            <!--TODO: Por confirmar antes de sair desta tela-->
            <q-btn
              @click="router.go(-1)"
              flat
              icon="arrow_left"
              label="Cancelar e Voltar"
              color="negative"
              rounded
              size="lg"
              no-caps
              class="full-width"
            />
          </div>

        </div>

      </q-form>



    </div>

  </q-page>
</q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from 'stores/app-store'


import RechargeResultsComponent from "components/pre_pago/RechargeResultsComponent.vue";
//import PaymentsOptionsComponent from "../../components/base/PaymentsOptionsComponent.vue";

export default defineComponent({
  name: 'ConfirmPayRechargePage',
  components: {PaymentsOptionsComponent, RechargeResultsComponent},
  setup () {
    const $q = useQuasar()
    const canShowPaymentOptions = ref(false)
    const appStore = useAppStore()
    const router = useRouter()
    const storeObject = ref([])

    const dynamicList = computed(() => {
      // if (storeObject.value) return storeObject.value
      if (!canShowPaymentOptions.value) return  storeObject.value

      let items = []
      items.push(storeObject.value[0])
      items.push(storeObject.value[1])
      items.push(storeObject.value[3])

      return items

    })

    return {
      canShowPaymentOptions,
      router,
      // details,
      dynamicList,
      storeObject,
      appStore,

      handleShowPaymentsOpts () {
        canShowPaymentOptions.value = true
      },

      initialize() {
          if (appStore.rechargesResponse) {

              storeObject.value = [
                  {title: 'Contador:',        value: appStore.rechargesResponse.meter_number},
                  {title: 'Nome do cliente:', value: appStore.rechargesResponse.customer.name},
                  {title: 'Endereço:',        value: appStore.rechargesResponse.customer.address},
                  {title: 'Valor a Pagar:',   value: appStore.formatMoney(appStore.rechargesResponse.paid_amount)},
                  {title: 'Dívida:',          value: appStore.formatMoney(appStore.rechargesResponse.debt_amount)},

                  {title: 'Taxa de serviço:', value: appStore.formatMoney(appStore.rechargesResponse.availability_service) },
                  {title: 'IVA:',             value: appStore.formatMoney(appStore.rechargesResponse.vat)},
                  {title: 'Valor de água:',   value: appStore.formatMoney(appStore.rechargesResponse.water_amount)},
                  {title: 'Unidade (m3):', value: appStore.rechargesResponse.water_volume + ' m3'},
                  {title: 'Tarifário:',       value: appStore.rechargesResponse.category || '-' },
              ]

          } else {

              // O user precisa comunicar-se novamente com a API para que os valores possam ser inicializados

              router.go(-1)

          }

      },

    }
  },
  mounted() {
      this.initialize()
  }
})
</script>
<style scoped lang="scss">
  .adjust-font-size {
    font-size: 50pt!important;
  }
</style>
