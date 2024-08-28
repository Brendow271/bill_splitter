<template>
  <div class="openedPopup">
    <v-container fluid>
      <p>Имя плательщика: {{ selectedPayer }}</p>

      <v-radio-group v-model="selectedPayer">
        <v-list class="bgPrime">
          <v-list-item
              v-for="(friend) in friends"
              :key="friend.id"
              class="pa-1"
          >
            <div class="d-flex justify-space-between">
              <v-list-item-avatar class="iconName ml-0">
                <span class="d-flex justify-center my-2">{{ getAvatarText(friend.name) }}</span>
              </v-list-item-avatar>
              <div class="mx-1 py-2 pl-2 text-white w-75 bgDark border-solid border-thin rounded">
                <v-list-item-title>{{ friend.name }}</v-list-item-title>
              </div>

              <v-list-item-action class="mr-0">
                <v-radio :value="friend.name"/>
              </v-list-item-action>
            </div>
          </v-list-item>
        </v-list>
      </v-radio-group>
    </v-container>
  </div>
</template>
<script>
import { useFriendsStore } from '../stores/friends.js';
import { ref, watch } from 'vue';
export default {
  name: 'PopupChoosePayer',
  props: {
    selectedPayer: {
      type: String,
      required: true
    }
  },
  emits:['update-payer'],
  setup(props, { emit }) {
    const friendsStore = useFriendsStore();
    const selectedPayer = ref(props.selectedPayer);
    const getAvatarText = (name) => {
      return name ? name.charAt(0).toUpperCase() : 'All';
    };
    watch(selectedPayer, (newValue) => {
      emit('update-payer', newValue);
    });
    return {
      friends: friendsStore.friends,
      selectedPayer,
      getAvatarText,
    };
  }
}
</script>