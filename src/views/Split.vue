<template>
  <div class="split-page d-flex justify-center align-center flex-column">
    <div class="border-solid list">
      <h1 class="d-flex justify-center text-white" id="ListFriend">Чек</h1>
      <hr/>
      <v-list>
        <v-list-item
            v-for="(position, index) in positions"
            :key="index"
        >
          <template v-slot:prepend>
            <v-text-field
                v-model="position.name"
                placeholder="Название позиции"
                class="positionName mr-5"
            ></v-text-field>
          </template>
          <v-text-field
              v-model="position.price"
              type="number"
              placeholder="Цена"
              suffix="руб."
              class="positionPrice"
          ></v-text-field>
          <template v-slot:append>
            <v-btn icon @click="toggleDetails(index)"
            class="ml-5">
              <v-icon>{{ expandedIndex === index ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </template>
<!--          Выпадает только под v-text-field-->
          <v-expand-transition>
            <div v-show="expandedIndex === index">
              <p>Дополнительная информация о позиции: {{ position.name }}</p>
            </div>
          </v-expand-transition>
<!--          Выпадает только под v-text-field-->
        </v-list-item>
      </v-list>
      <v-row>
        <v-col class="d-flex justify-center">
          <v-btn @click="addPosition" class="btnNext">+</v-btn>
        </v-col>
      </v-row>
      <hr/>
      <span class="avatar-text">Итого: {{ total }} руб.</span>
    </div>
    <v-btn :to="{ name: 'Result' }" class="btnNext text-white">Далее</v-btn>
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