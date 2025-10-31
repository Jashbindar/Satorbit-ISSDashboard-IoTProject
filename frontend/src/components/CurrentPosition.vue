<template>
  <div class="current-position-card">
    <div class="card-header">
      <h2>🛰️ Current ISS Position</h2>
      <span class="live-badge">
        <span class="live-dot">●</span>
        LIVE
      </span>
    </div>
    
    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else class="position-grid">
      <div class="position-item">
        <div class="icon">📍</div>
        <div class="content">
          <span class="label">Latitude</span>
          <span class="value">{{ data.latitude?.toFixed(4) }}°</span>
        </div>
      </div>
      
      <div class="position-item">
        <div class="icon">🧭</div>
        <div class="content">
          <span class="label">Longitude</span>
          <span class="value">{{ data.longitude?.toFixed(4) }}°</span>
        </div>
      </div>
      
      <div class="position-item">
        <div class="icon">🚀</div>
        <div class="content">
          <span class="label">Altitude</span>
          <span class="value">{{ data.altitude?.toFixed(2) }} km</span>
        </div>
      </div>
      
      <div class="position-item">
        <div class="icon">⚡</div>
        <div class="content">
          <span class="label">Velocity</span>
          <span class="value">{{ data.velocity?.toFixed(2) }} km/s</span>
        </div>
      </div>
    </div>
    
    <div class="update-info">
      <span>🔄 Last updated: {{ lastUpdate }}</span>
      <span class="auto-update">Updates every 60 seconds</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import {db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const loading = ref(true);
const data = ref({});
const lastUpdate = ref('--:--:--');
let unsubscribe = null;

onMounted(() => {
  const q = query(
    collection(db, 'iss_location'),
    orderBy('createdAt', 'desc'),
    limit(1)
  );
  
  // Real-time listener
  unsubscribe = onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      data.value = snapshot.docs[0].data();
      lastUpdate.value = new Date().toLocaleTimeString();
      loading.value = false;
      
      console.log('🔄 Current position updated:', data.value.latitude, data.value.longitude);
    }
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
</script>

<style scoped>
.current-position-card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.live-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #10b981;
  font-weight: 600;
  font-size: 0.75rem;
}

.live-dot {
  font-size: 0.9rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #64748b;
  font-size: 0.9rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.position-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  padding: 1rem;
  flex: 1;
}

.position-item {
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 6px;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  border: 1px solid #e2e8f0;
}

.position-item .icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.position-item .content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.position-item .label {
  color: #64748b;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.position-item .value {
  color: #3b82f6;
  font-size: 1rem;
  font-weight: 600;
}

.update-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 0.75rem;
  color: #64748b;
}

.auto-update {
  color: #10b981;
  font-weight: 500;
}

/* Responsive design */
@media (max-width: 768px) {
  .position-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 0.75rem;
  }
  
  .card-header {
    padding: 0.5rem 0.75rem;
  }
  
  .update-info {
    padding: 0.5rem 0.75rem;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
  }
  
  .position-item {
    padding: 0.5rem;
  }
  
  .position-item .value {
    font-size: 0.9rem;
  }
}
</style>