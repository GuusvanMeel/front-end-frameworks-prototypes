<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

const route = useRoute()
const router = useRouter()

const trainingPlanId = Number(route.params.id)

// Alleen opmaak + local state
const form = ref({
  week: 1,
  day: 'Tuesday',
  distance: 8,
  type: 'easy run'
})

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const types = ['easy run', 'tempo run', 'intervals', 'long run', 'rest']

async function onSubmit() {
  try {
    const marathonId = Number(route.params.id)

    // 1️⃣ Genereer UUID voor trainingPlan
    const planId = uuidv4()

    // 2️⃣ Maak nieuw trainingPlan aan met eigen id
    await fetch('http://localhost:3001/trainingPlans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: planId,
        userId: 1,
        marathonId: marathonId,
        weeks: 1,
        startDate: new Date().toISOString().split('T')[0]
      })
    })

    // 3️⃣ Genereer UUID voor trainingSession
    const sessionId = uuidv4()

    // 4️⃣ Maak trainingSession aan
    await fetch('http://localhost:3001/trainingSessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: sessionId,
        trainingPlanId: planId,
        week: form.value.week,
        day: form.value.day,
        distance: form.value.distance,
        type: form.value.type
      })
    })

    // 5️⃣ Redirect
    router.push({
      name: 'Training-Plan',
      params: { id: marathonId }
    })

  } catch (error) {
    console.error('Error creating plan/session:', error)
  }
}
</script>

<template>
  <div class="page">
    <h1>Add training session</h1>
    <p class="subtitle">Training plan #{{ trainingPlanId }}</p>

    <form class="card" @submit.prevent="onSubmit">
      <label class="field">
        <span class="label">Week</span>
        <select v-model.number="form.week" class="input">
          <option v-for="w in 20" :key="w" :value="w">Week {{ w }}</option>
        </select>
      </label>

      <label class="field">
        <span class="label">Day</span>
        <select v-model="form.day" class="input">
          <option v-for="d in days" :key="d" :value="d">{{ d }}</option>
        </select>
      </label>

      <label class="field">
        <span class="label">Distance (km)</span>
        <input v-model.number="form.distance" class="input" type="number" min="1" step="0.5" />
      </label>

      <label class="field">
        <span class="label">Type</span>
        <select v-model="form.type" class="input">
          <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
        </select>
      </label>

      <div class="actions">
        <button type="button" class="btn secondary" @click="router.back()">Cancel</button>
        <button type="submit" class="btn">Save</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.page {
  max-width: 640px;
  margin: 0 auto;
}

.subtitle {
  margin: 0.25rem 0 1.5rem;
  color: #666;
}

.card {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 10px;
  display: grid;
  gap: 1rem;
  color: black;
}

.field {
  display: grid;
  gap: 0.35rem;
}

.label {
  font-weight: 600;
}

.input {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
}

.actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.btn {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #222;
  color: white;
}

.btn.secondary {
  background: #e6e6e6;
  color: #222;
}
</style>