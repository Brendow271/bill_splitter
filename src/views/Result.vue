<template>
  <div class="result-page d-flex justify-center align-center flex-column mt-3">
    <div class="border-solid list">
      <h1 class="d-flex justify-center text-white">Итог</h1>
      <v-divider></v-divider>
      <div class="d-flex justify-center w-auto">
        <v-btn @click="setMode(modes.WHO_TO_WHOM)" text="Кто-Кому" class="bgDark w-50 ma-1" :class="{ 'border-solid': currentMode === modes.WHO_TO_WHOM }">
        </v-btn>
        <v-btn @click="setMode(modes.WHOM_TO_WHO)" text="Кому-Кто" class="bgDark w-50 ma-1" :class="{ 'border-solid': currentMode === modes.WHOM_TO_WHO }">
        </v-btn>
      </div>
      <v-divider></v-divider>

      <!-- Отображение "Кто-Кому" -->
      <v-list v-if="currentMode === modes.WHO_TO_WHOM" class="pa-0">
        <v-list-item
            v-for="(friend, index) in friends"
            :key="index"
            class="pa-1 w-100"
        >
          <div class="bgDark pa-2 rounded text-center">
            <template v-if="checkNeed(friend.name)">
              <span>Пользователь {{ friend.name }} должен</span>
              <v-divider></v-divider>
              <v-table fixed-header class="bgDark">
                <thead>
                <tr>
                  <th class="text-center bgDark">Кому должен</th>
                  <th class="text-center bgDark">Сумма, руб.</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(debtor, indexDebtor) in resultList[friend.name]" :key="indexDebtor">
                  <td>{{ debtor.name }}</td>
                  <td>{{ debtor.sum }}</td>
                </tr>
                </tbody>
              </v-table>
            </template>
            <template v-else>
              <span>Пользователь {{ friend.name }} ничего не должен</span>
            </template>
          </div>
        </v-list-item>
      </v-list>

      <!-- Отображение "Кому-Кто" -->
      <v-list v-if="currentMode === modes.WHOM_TO_WHO" class="pa-0">
        <v-list-item
            v-for="(friend, index) in friends"
            :key="index"
            class="pa-1 w-100"
        >
          <div class="bgDark pa-2 rounded text-center">
            <template v-if="checkNeed(friend.name)">
              <span>Пользователю {{ friend.name }} должны</span>
              <v-divider></v-divider>
              <v-table fixed-header class="bgDark">
                <thead>
                <tr>
                  <th class="text-center bgDark">Кто должен</th>
                  <th class="text-center bgDark">Сумма, руб.</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(debtor, indexDebtor) in resultList[friend.name]" :key="indexDebtor">
                  <td>{{ debtor.name }}</td>
                  <td>{{ debtor.sum }}</td>
                </tr>
                </tbody>
              </v-table>
            </template>
            <template v-else>
              <span>Пользователю {{ friend.name }} ничего не должны</span>
            </template>
          </div>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import { useFriendsStore } from "@/stores/friends.js";
import { reactive, ref } from "vue";

export default {
  name: "Result",
  setup() {
    const friendsStore = useFriendsStore();
    const friends = friendsStore.friends;
    const positions = friendsStore.positions;
    const resultList = reactive({});
    const modes = {
      WHO_TO_WHOM: 'whoToWhom',
      WHOM_TO_WHO: 'whomToWho',
    };
    const currentMode = ref(modes.WHO_TO_WHOM);

    const calculateResults = () => {
      friends.forEach((friend) => {
        resultList[friend.name] = [];
        positions.forEach((position) => {
          if (position.payerName === friend.name) {
            position.debtors.forEach((debtorName) => {
              if (friend.name !== debtorName) {
                const existingDebtor = resultList[friend.name].find(debtor => debtor.name === debtorName);
                const debtAmount = Math.round(parseFloat(position.price) / position.debtors.length);
                if (existingDebtor) {
                  existingDebtor.sum += debtAmount;
                } else {
                  resultList[friend.name].push({ name: debtorName, sum: debtAmount });
                }
              }
            });
          }
        });
      });
    };

    const summarizeResultsWhomToWho = () => {
      friends.forEach((friend) => {
        resultList[friend.name].forEach((debtor) => {
          if (resultList[debtor.name]) {
            const reverseDebt = resultList[debtor.name].find(item => item.name === friend.name);
            if (reverseDebt) {
              if (debtor.sum > reverseDebt.sum) {
                debtor.sum -= reverseDebt.sum;
                reverseDebt.sum = 0;
              } else {
                reverseDebt.sum -= debtor.sum;
                debtor.sum = 0;
              }
            }
          }
        });
        resultList[friend.name] = resultList[friend.name].filter(debtor => debtor.sum > 0);
      });
    };





    const checkNeed = (friendName) => {
      return resultList[friendName] && resultList[friendName].length > 0;
    };

    // const checkContainPayer = (friendName) =>
    // {
    //   resultList.
    // }

    const setMode = (mode) => {
      currentMode.value = mode;
    };

    calculateResults();
    summarizeResultsWhomToWho();

    return {
      friends,
      resultList,
      checkNeed,
      setMode,
      currentMode,
      modes,

    };
  },
};
</script>