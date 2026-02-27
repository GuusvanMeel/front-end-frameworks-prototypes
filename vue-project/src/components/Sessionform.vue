<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  trainingPlanId: {
    type: [String, Number],
    required: false
  },
  marathonId: {
    type: [Number],
    required: true
  }
})

const emit = defineEmits(['saved', 'cancel'])

const form = ref({
  week: 1,
  day: 'Tuesday',
  distance: 8,
  type: 'easy run'
})

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const types = ['easy run','tempo run','intervals','long run','rest']

async function onSubmit() {
  let planId = props.trainingPlanId
  console.log("ONSUBMIT");

  // 🔹 If no plan exists yet → create one
  if (!planId) {
    planId = uuidv4()

    await fetch('http://localhost:3001/trainingPlans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: planId,
        userId: 1,
          marathonId: Number(props.marathonId),
        weeks: 1,
        startDate: new Date().toISOString().split('T')[0]
      })
    })
  }

  // 🔹 Always create session
  const sessionId = uuidv4()

  await fetch('http://localhost:3001/trainingSessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: sessionId,
      trainingPlanId: planId,
      week: form.value.week,
      day: form.value.day,
      distance: form.value.distance,
      type: form.value.type
    })
  })

  emit('saved')
}
</script>

<template>
  <form class="card" @submit.prevent="onSubmit">
    <label>
      Week
      <select v-model.number="form.week">
        <option v-for="w in 20" :key="w" :value="w">
          Week {{ w }}
        </option>
      </select>
    </label>

    <label>
      Day
      <select v-model="form.day">
        <option v-for="d in days" :key="d">
          {{ d }}
        </option>
      </select>
    </label>

    <label>
      Distance
      <input type="number" v-model.number="form.distance" />
    </label>

    <label>
      Type
      <select v-model="form.type">
        <option v-for="t in types" :key="t">
          {{ t }}
        </option>
      </select>
    </label>

    <div class="actions">
      <button type="button" @click="emit('cancel')">Cancel</button>
      <button type="submit">Save</button>
    </div>
  </form>
</template>