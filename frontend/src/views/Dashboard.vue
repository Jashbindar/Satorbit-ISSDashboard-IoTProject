<script setup>
import { ref, onMounted } from 'vue'
import CurrentPosition from '../components/CurrentPosition.vue'
import DataTable from '../components/DataTable.vue'
import Map from '../components/Map.vue'
import Altitude from '@/components/AltitudeChart.vue'
</script>

<template>
  <div class="dashboard-container">
    <!-- 🧭 BEAUTIFUL HEADER SECTION -->
    <header class="header">
      <div class="header-content">
        <div class="header-main">
          <div class="title-section">
            <h1 class="project-title">ISS Tracker - Project</h1>
            <div class="title-underline"></div>
          </div>
          <div class="header-details">
            <div class="detail-item">
              <span class="detail-label">Course</span>
              <span class="detail-value">TFB 2093 – Internet of Things</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Semester</span>
              <span class="detail-value">September 2025</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Lecturer</span>
              <span class="detail-value">Dr. Ooi Boon Yaik</span>
            </div>
          </div>
        </div>
        <div class="group-section">
          <div class="group-members">
            <span class="members-label">Project Team</span>
            <span class="members-names">NADZIRA RAMLI(22010431), JASHBINDAR SINGH(22010432), NURHUMAIRA(22010433), ETHAN LEE(22010434)</span>
          </div>
        </div>
      </div>
    </header>
    
    <main class="dashboard">
      <!-- Real-time Data -->
      <div class="section real-time-data">
        <CurrentPosition />
      </div>
      
      <!-- Map Visualization -->
      <div class="section visualization">
        <Map />
      </div>
      
      <!-- Data Table -->
      <div class="section historical-data">
        <DataTable />
      </div>
      
      <!-- Altitude Chart -->
      <div class="section analytics">
        <Altitude />
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f8fafc;
  font-family: 'Arial', sans-serif;
}

.header {
  flex-shrink: 0;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #5b21b6 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1700px;
  margin: 0 auto;
  width: 100%;
  gap: 2rem;
}

.header-main {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: white;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.title-underline {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #60a5fa, #a78bfa);
  border-radius: 2px;
}

.header-details {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #c7d2fe;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
}

.group-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.group-members {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.members-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #c7d2fe;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.members-names {
  font-size: 0.85rem;
  font-weight: 500;
  color: white;
  line-height: 1.3;
}

.dashboard {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.75rem;
  padding: 0.75rem;
  max-width: 1700px;
  margin: 0 auto;
  overflow: hidden;
  height: calc(100vh - 140px);
  width: 100%;
}

.section {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  overflow: hidden;
  min-height: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Grid placement */
.real-time-data {
  grid-column: 1;
  grid-row: 1;
  border-left: 4px solid #10b981;
}

.visualization {
  grid-column: 2;
  grid-row: 1;
  border-left: 4px solid #3b82f6;
}

.historical-data {
  grid-column: 1;
  grid-row: 2;
  border-left: 4px solid #f59e0b;
}

.analytics {
  grid-column: 2;
  grid-row: 2;
  border-left: 4px solid #8b5cf6;
}

/* Responsive design */
@media (max-width: 1024px) {
  .dashboard {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    gap: 0.5rem;
    padding: 0.5rem;
    height: calc(100vh - 160px);
  }
  
  .real-time-data,
  .visualization,
  .historical-data,
  .analytics {
    grid-column: 1;
  }
  
  .real-time-data { grid-row: 1; }
  .visualization { grid-row: 2; }
  .historical-data { grid-row: 3; }
  .analytics { grid-row: 4; }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .group-section {
    align-items: flex-start;
    width: 100%;
  }
  
  .group-members {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0.75rem 1rem;
  }
  
  .project-title {
    font-size: 1.5rem;
  }
  
  .header-details {
    gap: 1rem;
  }
  
  .detail-item {
    min-width: 120px;
  }
  
  .section {
    padding: 0.5rem;
  }
}

@media (max-height: 700px) {
  .header {
    padding: 0.5rem 1rem;
  }
  
  .project-title {
    font-size: 1.25rem;
  }
  
  .dashboard {
    height: calc(100vh - 100px);
    gap: 0.5rem;
    padding: 0.5rem;
  }
}
</style>