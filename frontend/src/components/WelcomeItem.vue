<template>
  <div>
    <h2>Firestore Test</h2>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <div v-else>
      <p><strong>ID:</strong> {{ id }}</p>
      <p><strong>Name:</strong> {{ name }}</p>
      <p><strong>Age:</strong> {{ age }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db, doc, getDoc } from '../firebase'

// Define variables
const name = ref('')
const age = ref('')
const id = ref('')
const loading = ref(true)
const error = ref('')

// Fetch Firestore data once component is mounted
onMounted(async () => {
  try {
    const docRef = doc(db, "users", "user1") // 👉 users = collection, user1 = document ID
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      name.value = data.name
      age.value = data.age
      id.value = docSnap.id
    } else {
      error.value = "No such document!"
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>
