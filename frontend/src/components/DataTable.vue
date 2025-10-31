<script setup>
import { ref, onMounted } from 'vue'
import {db } from '../firebase'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

//import component
import CurrentPosition from '../components/CurrentPosition.vue'
const datalist = ref([]);
/* onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "iss_location"));
  querySnapshot.forEach((doc) => {
    datalist.value.push({ id: doc.id, ...doc.data() });
    console.log('Fetched data:', datalist.value)
  });
});*/
onMounted(async () => {
  const q = query(collection(db, "iss_location"), orderBy("timestamp", "desc"), limit(10));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    datalist.value.push({ id: doc.id, ...doc.data() });
    console.log('Fetched 10 data:', datalist.value);
  });
});
function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString();
}
</script>

<template>
  <main>
<div class="card">
    <div class="card-header">
      <h2>📊 ISS Telemetry Data</h2>
    </div>
    
    <div class="card-content">
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Altitude</th>
              <th>Longitude</th>
              <th>Latitude</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in datalist" :key="item.id">
              <td>{{ formatTime(item.createdAt) }}</td>
              <td>{{ item.altitude.toFixed(2) }} km</td>
              <td>{{ item.longitude.toFixed(4) }}°</td>
              <td>{{ item.latitude.toFixed(4) }}°</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  </main>
</template>

<style scoped>
/* Card Wrapper - Compact for Dashboard */
.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.card-header {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  background: #f5f5f5;
  flex-shrink: 0;
}

.card-header h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
}

.card-content {
  padding: 0;
  flex: 1;
  overflow: auto;
  min-height: 0;
}

/* Table Styles - Compact */
.table-wrapper {
  overflow: auto;
  height: 300px;
  max-height: 100%;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Arial', sans-serif;
  font-size: 0.8rem;
}

.data-table thead {
  position: sticky;
  top: 0;
  background: #f5f5f5;
  z-index: 10;
}

.data-table th {
  padding: 0.5rem;
  text-align: left;
  font-weight: bold;
  font-size: 0.8rem;
  border-bottom: 2px solid #ddd;
  color: #333;
  white-space: nowrap;
}

.data-table td {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  font-size: 0.8rem;
  color: #555;
  white-space: nowrap;
}

.data-table tbody tr:nth-child(even) {
  background: #fafafa;
}

.data-table tbody tr:hover {
  background: #f0f0f0;
}

/* Ensure the table takes full available height */
.data-table tbody {
  display: table-row-group;
}

/* Compact scrollbar */
.table-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-header {
    padding: 0.5rem;
  }
  
  .card-header h2 {
    font-size: 0.9rem;
  }
  
  .data-table th,
  .data-table td {
    padding: 0.4rem;
    font-size: 0.75rem;
  }
}
</style>