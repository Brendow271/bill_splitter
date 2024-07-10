<template>
  <div class="friend-list d-flex justify-center align-center flex-column">
    <div class="border-solid list">
      <h1 class="d-flex justify-center text-white" id="ListFriend">Список людей</h1>
      <hr/>
      <v-list>
        <v-list-item
            v-for="(friend, index) in friends"
            :key="index"
        >
          <template v-slot:prepend>
            <v-avatar class="iconName">
              <span class="avatar-text">{{ getAvatarText(friend.name) }}</span>
            </v-avatar>
          </template>
          <v-text-field
              v-model="friend.name"
              placeholder="Имя"
              class="ml-3"
              hide-details
          ></v-text-field>
          <template v-slot:append>
            <v-btn
              icon
              class="deleteBtn"
              @click="removeFriend(index)">
              <v-img
                  src="../../public/icons/Trash.svg"
                  class="delete"
              ></v-img>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-row>
        <v-col class="d-flex justify-center">
          <v-btn
              @click="addFriend"
              class="btnNext"
          >
            +
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-btn
        :to="{ name: 'Split' }"
        class="btnNext text-white"
    >Далее
    </v-btn>
  </div>
</template>

<script>

import {useFriendsStore} from '@/stores/friends.js';

export default {
  name: 'FriendList',
  setup() {
    const friendsStore = useFriendsStore();
    return {
      friends: friendsStore.friends,
      addFriend: friendsStore.addFriend,
      removeFriend: friendsStore.removeFriend,
      getAvatarText(name) {
        return name ? name.charAt(0).toUpperCase() : '?';
      }
    }
  }
}
</script>
