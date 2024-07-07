<template>
  <div>
    <img src="../../public/images/logo.svg" alt="Logo" class="logo">
    <div class="text-h1 text-white">
      Bill Splitter
    </div>
    <v-btn :to="{ name: 'FriendList' }">Начать</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
/* Ваши стили */
</style>