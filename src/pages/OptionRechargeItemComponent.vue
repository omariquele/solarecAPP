<template>
  <q-item>
    <q-item-section class="text-left text-bold text-grey-7" style="font-size: 10pt">
      {{ detail.title }}
    </q-item-section>
    <q-item-section class="text-right text-positive text-bold" style="font-size: 10pt">
      {{  detail.value }}
    </q-item-section>
  </q-item>

</template>

<script>
export default {
  name: "OptionRechargeItemComponent",
  props: ['detail']
}
</script>

<style scoped>

</style>
