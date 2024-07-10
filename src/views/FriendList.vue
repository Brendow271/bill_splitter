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
          <v-avatar class="iconName">
            <span class="avatar-text">{{ getAvatarText(friend.name) }}</span>
          </v-avatar>

          <v-text-field
              v-model="friend.name"
              placeholder="Имя"
              class="flex-grow-1"
              hide-details
          ></v-text-field>

          <v-img
              src="../../public/icons/Trash.svg"
              @click="removeFriend(index)"
              class="delete"
          ></v-img>

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
export default {
  name: 'FriendList',
  data() {
    return {
      friends: [
        {name: 'Гена'},
        {name: ''}
      ]
    }
  },
  methods: {
    addFriend() {
      this.friends.push({name: ''});
    },
    removeFriend(index) {
      this.friends.splice(index, 1);
    },
    getAvatarText(name) {
      return name ? name.charAt(0).toUpperCase() : '?';
    }
  }
}
</script>
