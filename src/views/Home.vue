<template>
  <div class="home d-flex justify-center align-center flex-column">
    <v-img src="../../public/images/logo.svg" alt="Logo" class="logo"/>
    <h1 class="text-white text-uppercase" id="logoName">
      Bill Splitter
    </h1>
    <v-btn
        :to="{ name: 'FriendList' }"
        class="btnNext btnHome text-white"
        text="Начать"
    />
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>