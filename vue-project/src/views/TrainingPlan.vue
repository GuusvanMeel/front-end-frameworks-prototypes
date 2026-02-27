<script setup>
import Sessionform from '@/components/Sessionform.vue';
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isModalOpen = ref(false);
const trainingPlans = ref([])
const trainingPlan = computed(() => trainingPlans.value[0] ?? null)

const sessionRes = ref([])

function handleSaved() {
  isModalOpen.value = false
  loadSessions() // your fetch logic again
}
onMounted(loadSessions)
async function loadSessions() {
  const marathonId = route.params.id

  const res = await fetch(
    `http://localhost:3001/trainingPlans?marathonId=${marathonId}`
  )
  const plans = await res.json()
  trainingPlans.value = plans

  const plan = plans[0]
  if (!plan) {
    sessionRes.value = []
    return
  }

  const sres = await fetch(
    `http://localhost:3001/trainingSessions?trainingPlanId=${plan.id}`
  )
  
  sessionRes.value = await sres.json()
}

// Groepeer sessions per week
const sessionsByWeek = computed(() => {
  const grouped = {}
  for (const s of sessionRes.value) {
    ;(grouped[s.week] ??= []).push(s)
  }
  return grouped
})
</script>
<template>
  <div class="training-plan">
    <h1>Training Plan</h1>
    <div v-if="!trainingPlan" class="no-plan">
  <p>No training plan found for this marathon.</p>

<button @click="isModalOpen = true">
  Add Session
</button>

<div v-if="isModalOpen" class="modal-overlay">
  <div class="modal">
    <Sessionform
  :trainingPlanId="trainingPlan?.id"
  :marathonId="route.params.id"
  @saved="handleSaved"
  @cancel="isModalOpen = false"
/>
  </div>
</div>
</div>
<template v-else>
    <div class="plan-info">
      <p><strong>Start Date:</strong> {{ trainingPlan.startDate }}</p>
      <p><strong>Total Weeks:</strong> {{ trainingPlan.weeks }}</p>
    </div>  

    <div
      v-for="(weekSessions, week) in sessionsByWeek"
      :key="week"
      class="week-card"
    >
      <h2>Week {{ week }}</h2>

      <div class="session-list">
        <div
          v-for="session in weekSessions"
          :key="session.id"
          class="session-card"
        >
          <div class="session-header">
            <span class="day">{{ session.day }}</span>
            <span class="type">{{ session.type }}</span>
          </div>

          <div class="distance">
            {{ session.distance }} km
          </div>
        </div>
      </div>
    </div>
    <button @click="isModalOpen = true">
  Add Session
</button>

<div v-if="isModalOpen" class="modal-overlay">
  <div class="modal">
    <Sessionform
  :trainingPlanId="trainingPlan?.id"
  :marathonId="route.params.id"
  @saved="handleSaved"
  @cancel="isModalOpen = false"
/>
  </div>
</div>
    </template>
  </div>
  
</template>

<style scoped>
.training-plan {
  max-width: 800px;
  margin: 0 auto;
}

.plan-info {
  margin-bottom: 2rem;
}

.week-card {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  color: black;
}

.session-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.session-card {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.session-header {
  display: flex;
  flex-direction: column;
}

.day {
  font-weight: bold;
}

.type {
  font-size: 0.9rem;
  color: #666;
}

.distance {
  font-weight: bold;
  font-size: 1.1rem;
}
</style>