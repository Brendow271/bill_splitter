<template>
  <div class="friend-list d-flex justify-center align-center flex-column mt-5">
    <div class="border-solid list">
      <h1 class="d-flex justify-center text-white" id="ListFriend">Список людей</h1>
      <v-divider/>
      <v-list>
        <v-list-item
            v-for="(friend, index) in friends"
            :key="friend.id"
        >
          <template #prepend>
            <v-avatar
                class="iconName"
                :text="getAvatarText(friend.name)"
            />
          </template>
          <v-text-field
              v-model="friend.name"
              placeholder="Имя"
              class="ml-3 text-white bgDark rounded"
              hide-details
          />
          <template #append>
            <v-btn
                class="deleteBtn mr-1"
                @click="removeFriend(index)"
            >
              <v-img
                  src="../../public/icons/Trash.svg"
                  class="delete"
              />
            </v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-row>
        <v-col class="d-flex justify-center">
          <v-btn
              @click="addFriend"
              class="btnNext text-white"
              text="+"
          />
        </v-col>
      </v-row>
    </div>
    <v-btn
        v-if="canProceed"
        :to="{ name: 'Split' }"
        text="Далее"
        class="btnNext text-white mt-2"
    />
  </div>
</template>

<script>
import { useFriendsStore } from '@/stores/friends.js';
import { computed } from 'vue';

export default {
  name: 'FriendList',
  setup() {
    const friendsStore = useFriendsStore();

    const canProceed = computed(() => {
      if (friendsStore.friends.length === 0) return false;
      return friendsStore.friends.every(friend => friend.name.trim() !== '');
    });

    return {
      friends: friendsStore.friends,
      addFriend: friendsStore.addFriend,
      removeFriend: friendsStore.removeFriend,
      getAvatarText(name) {
        return name ? name.charAt(0).toUpperCase() : '?';
      },
      canProceed,
    }
  }
}
</script>