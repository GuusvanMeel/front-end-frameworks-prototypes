<script setup>
import { ref, onMounted } from 'vue'

const marathons = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:3001/marathons')
  marathons.value = await res.json()
})
</script>

<template>
  <div>
    <h1>Marathons</h1>

    <ul>
      <li v-for="m in marathons" :key="m.id">
        <router-link
          :to="{ name: 'marathon-detail', params: { id: m.id } }"
        >
          {{ m.name }} - {{ m.location }}
        </router-link>
      </li>
    </ul>
  </div>
</template>