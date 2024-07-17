<template>
  <div class="split-page d-flex justify-center align-center flex-column">
    <div class="border-solid list">
      <h1 class="d-flex justify-center text-white" id="ListFriend">Чек</h1>
      <hr/>
      <v-list>
        <v-list-item
            v-for="(position, index) in positions"
            :key="index"
            class=""
        >
          <div class="d-flex">

            <v-text-field
                v-model="position.name"
                placeholder="Название позиции"
                class="positionName mr-3"
            ></v-text-field>

            <v-text-field
                v-model="position.price"
                type="number"
                placeholder="Цена"
                suffix="руб."
                class="positionPrice"
            ></v-text-field>

            <v-btn icon @click="toggleDetails(index)" class="ml-3">
              <v-icon>{{ expandedIndex === index ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </div>

          <v-expand-transition>
            <div v-show="expandedIndex === index" class="details  ">
              <p>Выбор должников должников</p>
              <v-list>
                <v-list-item v-for="friend in friends" :key="friend.name">
                  <v-checkbox :label="friend.name" v-model="position.debtors" :value="friend.name"></v-checkbox>
                </v-list-item>
              </v-list>
            </div>
          </v-expand-transition>

        </v-list-item>
      </v-list>
      <v-row>
        <v-col class="d-flex justify-center mb-3">
          <v-btn @click="addPosition" class="btnNext">+</v-btn>
        </v-col>
      </v-row>
      <hr/>
      <span class="text-white d-flex justify-end text-h5" id="finalValue">Итого: {{ total }} руб.</span>
    </div>
    <v-btn :to="{ name: 'Result' }" class="btnNext text-white mt-3">Далее</v-btn>
  </div>
</template>


<script>
import {useFriendsStore} from '@/stores/friends';
import {ref, computed} from 'vue';

export default {
  name: 'Split',
  setup() {
    const friendsStore = useFriendsStore();
    const expandedIndex = ref(null);

    const toggleDetails = (index) => {
      expandedIndex.value = expandedIndex.value === index ? null : index;
    };

    const addPosition = () => {
      console.log('Adding position'); // Отладочное сообщение
      friendsStore.addPosition({name: '', price: 0});
    };

    const removePosition = (index) => {
      console.log('Removing position at index:', index); // Отладочное сообщение
      friendsStore.removePosition(index);
    };

    const total = computed(() => {
      return friendsStore.positions.reduce((sum, position) => sum + parseFloat(position.price || 0), 0);
    });
    return {
      positions: friendsStore.positions,
      expandedIndex,
      toggleDetails,
      addPosition,
      removePosition,
      total
    };
  }
}
</script>