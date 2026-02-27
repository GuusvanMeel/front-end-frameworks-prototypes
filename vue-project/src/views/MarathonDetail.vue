<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TrainingPlan from './TrainingPlan.vue'

const route = useRoute()
const marathon = ref(null)

onMounted(async () => {
  const res = await fetch(`http://localhost:3001/marathons/${route.params.id}`)
  marathon.value = await res.json()
})
</script>

<template >
    <div v-if="marathon">
  <div >
    <h1>{{ marathon.name }}</h1>
    <p>{{ marathon.location }}</p>
    <p>{{ marathon.date }}</p>
  </div>
  <TrainingPlan></TrainingPlan> 
  </div>
</template>