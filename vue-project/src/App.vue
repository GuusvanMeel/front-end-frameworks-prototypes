<script setup>
</script>

<template>
  <div class="layout">
    <nav class="navbar">
      <router-link :to="{name: 'home'}">Home</router-link>
      <router-link :to="{name: 'about'}">About</router-link>
      <router-link :to="{name: 'marathons'}">Marathons</router-link>
    </nav>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.navbar {
  position: sticky;
  top: 0;
  background: #1abaaa;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  z-index: 10;
  width: 100%;
}

.navbar a {
  color: white;
  text-decoration: none;
}

.navbar a.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}

.content {
  flex: 1;
  padding: 2rem;
}
</style>