<template>
  <div class="friend-list d-flex justify-center align-center flex-column">
    <div class="border-solid">
      <h1>Список людей</h1>
      <hr/>
      <v-spacer></v-spacer>
      <v-container>
        <v-row>
          <v-col>
            <v-list>
              <v-list-item
                  v-for="(friend, index) in friends"
                  :key="index"
                  class="d-flex align-center"
              >

                <v-avatar class="mr-3">
                  <v-icon v-if="friend.name">{{ friend.name.charAt(0) }}</v-icon>
                  <v-icon v-else>mdi-help</v-icon>
                </v-avatar>

                <v-text-field
                    v-model="friend.name"
                    placeholder="Имя"
                    class="flex-grow-1"
                    hide-details
                ></v-text-field>

                <v-btn icon @click="removeFriend(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn @click="addFriend">
              <v-icon left>mdi-plus</v-icon>
              Добавить друга
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>

<!--    <v-btn-->
<!--      :to="{ name: 'Split' }"-->
<!--      class="btnNext text-white"-->
<!--      >Далее-->
<!--    </v-btn>-->
  </div>
</template>

<script>
  export default {
    name: 'FriendList',
    data() {
      return {
        friends: [
          { name: 'Имя' }
        ]
      }
    },
    methods: {
      addFriend() {
        this.friends.push({ name: '' });
      },
      removeFriend(index) {
        this.friends.splice(index, 1);
      }
    }
  }
</script>
