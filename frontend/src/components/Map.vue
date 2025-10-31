<template>
  <div class="iss-map-card">
    <div class="card-header">
      <h2>🗺️ Live ISS Position & Path</h2>
    </div>
    
    <div id="map"></div>
    
    <div class="map-info">
      <p>
        <strong>Current:</strong> 
        {{ currentLat.toFixed(4) }}°, {{ currentLon.toFixed(4) }}° | 
        <strong>Alt:</strong> {{ currentAlt.toFixed(2) }} km
      </p>
      <p class="path-info">Showing last 20 positions</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const currentLat = ref(0);
const currentLon = ref(0);
const currentAlt = ref(0);

let map = null;
let marker = null;
let pathLine = null;
let unsubscribe = null;

// Load path
async function loadPath() {
  const q = query(
    collection(db, 'iss_location'),
    orderBy('createdAt', 'desc'),
    limit(200)
  );
  
  const snapshot = await getDocs(q);
  const coords = [];
  
  snapshot.forEach(doc => {
    const d = doc.data();
    coords.push([d.latitude, d.longitude]);
  });
  
  if (pathLine && coords.length > 0) {
    pathLine.setLatLngs(coords.reverse());
  }
}

// Setup real-time current position
function setupRealTime() {
  const q = query(
    collection(db, 'iss_location'),
    orderBy('createdAt', 'desc'),
    limit(1)
  );
  
  unsubscribe = onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const data = snapshot.docs[0].data();
      
      currentLat.value = data.latitude;
      currentLon.value = data.longitude;
      currentAlt.value = data.altitude;
      
      if (marker && map) {
        marker.setLatLng([data.latitude, data.longitude]);
        map.setView([data.latitude, data.longitude], 3);
      }
    }
  });
}

onMounted(async () => {
  // Initialize map
  map = L.map('map').setView([0, 0], 2);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);
  
  // ISS icon
  const icon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
    iconSize: [50, 30],
    iconAnchor: [25, 15]
  });
  
  marker = L.marker([0, 0], { icon }).addTo(map);
  pathLine = L.polyline([], { color: '#667eea', weight: 3 }).addTo(map);
  
  // Load data
  await loadPath();
  setupRealTime();
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
</script>

<style scoped>
.iss-map-card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.card-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.card-header h2 {
  margin: 0;
  font-size: 0.9rem;
  color: #1e293b;
  font-weight: 600;
}

#map {
  flex: 1;
  min-height: 250px;
  border-radius: 0;
}

.map-info {
  padding: 0.75rem 1rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}

.map-info p {
  margin: 0.25rem 0;
  font-size: 0.8rem;
  color: #475569;
}

.path-info {
  font-size: 0.75rem;
  color: #64748b;
}

/* Ensure map container works properly */
.iss-map-card {
  position: relative;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-header {
    padding: 0.5rem 0.75rem;
  }
  
  .map-info {
    padding: 0.5rem 0.75rem;
  }
  
  #map {
    min-height: 200px;
  }
}
</style>