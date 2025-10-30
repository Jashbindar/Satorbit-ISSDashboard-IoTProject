<script setup>
import { ref, onMounted } from 'vue'
import {db } from '../firebase'
import { collection,getDocs } from '../firebase';

const datalist = ref([]);
onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "iss_location"));
  querySnapshot.forEach((doc) => {
    datalist.value.push({ id: doc.id, ...doc.data() });
    console.log('Fetched data:', datalist.value)
  });
});
</script>

<template>
  <main>
     <h1 class="va-h1">Dashboard</h1>
    <VaButton type="info" round="label" class="mb-6">
      This is a starter project for
      <a
        href="https://vuestic.dev/"
        target="_blank"
        rel="noopener"
        class="underline underline-offset-2 font-medium"
        >Vuestic UI</a
      >
    </VaButton>
    <VaCard>
    <VaCardTitle>
      <h1 class="card-title text-tag text-secondary font-bold uppercase">ISS Telemetry </h1>
    </VaCardTitle>
    <VaCardContent>
      <div class="p-1 bg-black rounded absolute right-4 top-4">
        <VaIcon name="mso-attach_money" color="#fff" size="large" />
      </div>
      <div>
    <h2>ISS Telemetry Data</h2>
    <ul>
      <li v-for="(item, index) in datalist" :key="index">
        {{ item.latitude }}, {{ item.longitude }}
      </li>
    </ul>
    </div>
    </VaCardContent>
  </VaCard>

  </main>
</template>
