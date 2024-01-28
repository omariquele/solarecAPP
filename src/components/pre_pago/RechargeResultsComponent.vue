<template>
    <div>
        <q-list dense bordered padding class="rounded-borders q-pa-none q-ma-none">
          <option-recharge-item-component
            v-for="detail in details"
            :detail="detail"
            :key="detail.id"
          />
        </q-list>
    </div>
</template>

<script>

import OptionRechargeItemComponent from "components/pre_pago/OptionRechargeItemComponent.vue";

export default {
  name: "RechargeResultsComponent",
  components: {OptionRechargeItemComponent},
  props: ['details']
}
</script>

<style scoped>

</style>
