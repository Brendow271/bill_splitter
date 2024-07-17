<template>
  <v-container fluid>
    <p>Selected Button: {{ selectedPayer }}</p>
    <v-radio-group v-model="selectedPayer">
      <v-radio
          v-for="(friend, index) in friends"
          :key="index"
          :label="friend.name"
          :value="friend.name"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
import {useFriendsStore} from '../stores/friends.js';
export default {
  setup () {
    const friendsStore = useFriendsStore();
    return {
      friends: friendsStore.friends,
      selectedPayer: 'Плательщик',
    }
  },
}
</script>