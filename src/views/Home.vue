<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
    <v-btn text :to="{ name: 'Friend_list' }">Go to FriendList</v-btn>
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