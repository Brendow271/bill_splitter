<template>
  <div class="result-page d-flex justify-center align-center flex-column mt-3">
    <div class="border-solid list">
      <h1 class="d-flex justify-center text-white" id="Result">Итог</h1>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between buttonSwitch">
        <v-btn @click="setMode(modes.WHO_TO_WHOM)" text="Кто-Кому" class="bgDark ma-1 text-white"
               :class="{ 'border-solid': currentMode === modes.WHO_TO_WHOM }">
        </v-btn>
        <v-btn @click="setMode(modes.WHOM_TO_WHO)" text="Кому-Кто" class="bgDark ma-1 text-white"
               :class="{ 'border-solid': currentMode === modes.WHOM_TO_WHO }">
        </v-btn>
      </div>
      <v-divider></v-divider>

      <!-- Отображение "Кто-Кому" -->
      <v-list v-if="currentMode === modes.WHO_TO_WHOM" class="pa-0 text-white">
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
                  <th class="text-center bgDark text-white">Кому должен</th>
                  <th class="text-center bgDark text-white">Сумма, руб.</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(debtor, indexDebtor) in resultListWhoToWhom[friend.name]" :key="indexDebtor">
                  <td class="text-white">{{ debtor.name }}</td>
                  <td class="text-white">{{ debtor.sum }}</td>
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
          <div class="bgDark pa-2 rounded text-center text-white">
            <template v-if="checkNeed(friend.name)">
              <span>Пользователю {{ friend.name }} должны</span>
              <v-divider></v-divider>
              <v-table fixed-header class="bgDark">
                <thead>
                <tr>
                  <th class="text-center text-white bgDark">Кто должен</th>
                  <th class="text-center text-white bgDark">Сумма, руб.</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(debtor, indexDebtor) in resultListWhomToWho[friend.name]" :key="indexDebtor">
                  <td class="text-white">{{ debtor.name }}</td>
                  <td class="text-white">{{ debtor.sum }}</td>
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
import {useFriendsStore} from "@/stores/friends.js";
import {reactive, ref} from "vue";

export default {
  name: "Result",
  setup() {
    const friendsStore = useFriendsStore();
    const friends = friendsStore.friends;
    const positions = friendsStore.positions;
    const resultListWhoToWhom = reactive({});
    const resultListWhomToWho = reactive({});
    const modes = {
      WHO_TO_WHOM: 'whoToWhom',
      WHOM_TO_WHO: 'whomToWho',
    };
    const currentMode = ref(modes.WHO_TO_WHOM);

    const summarizeResultsWhomToWho = () => {

      friends.forEach((friend) => {
        resultListWhomToWho[friend.name] = [];
        positions.forEach((position) => {
          if (position.payerName === friend.name) {
            position.debtors.forEach((debtorName) => {
              if (friend.name !== debtorName) {
                const existingDebtor = resultListWhomToWho[friend.name].find(debtor => debtor.name === debtorName);
                const debtAmount = Math.round(parseFloat(position.price) / position.debtors.length);
                if (existingDebtor) {
                  existingDebtor.sum += debtAmount;
                } else {
                  resultListWhomToWho[friend.name].push({name: debtorName, sum: debtAmount});
                }
              }
            });
          }
        });
      });

      friends.forEach((friend) => {
        resultListWhomToWho[friend.name].forEach((debtor) => {
          if (resultListWhomToWho[debtor.name]) {
            const reverseDebt = resultListWhomToWho[debtor.name].find(item => item.name === friend.name);
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
        resultListWhomToWho[friend.name] = resultListWhomToWho[friend.name].filter(debtor => debtor.sum > 0);
      });
    };

    const summarizeResultsWhoToWhom = () => {

      friends.forEach((friend) => {
        resultListWhoToWhom[friend.name] = [];
        positions.forEach((position) => {
          position.debtors.forEach((debtor) => {
            if (debtor === friend.name) {
              const existingPayer = resultListWhoToWhom[friend.name].find(payer => payer.name === position.payerName);
              const payerAmount = Math.round(parseFloat(position.price) / position.debtors.length);

              if (existingPayer) {
                existingPayer.sum += payerAmount;
              } else {
                resultListWhoToWhom[friend.name].push({name: position.payerName, sum: payerAmount});
              }
            }
          })
        })
      })


      friends.forEach((friend) => {
        if (resultListWhoToWhom[friend.name]) {
          resultListWhoToWhom[friend.name].forEach((payer) => {
            if (resultListWhoToWhom[payer.name]) {

              const reversePayer = resultListWhoToWhom[payer.name].find(payer => payer.name === friend.name);

              if (reversePayer) {
                if (payer.sum > reversePayer.sum) {
                  payer.sum -= reversePayer.sum;
                  reversePayer.sum = 0;
                } else {
                  reversePayer.sum -= payer.sum;
                  payer.sum = 0;
                }
              }
            }
          });
          resultListWhoToWhom[friend.name] = resultListWhoToWhom[friend.name].filter(payer => payer.sum > 0);
        }
      });
    }






  const checkNeed = (friendName) => {
    if (currentMode.value === modes.WHOM_TO_WHO)
      return resultListWhomToWho[friendName] && resultListWhomToWho[friendName].length > 0;
    else
      return resultListWhoToWhom[friendName] && resultListWhoToWhom[friendName].length > 0
  };

  // const checkContainPayer = (friendName) =>
  // {
  //   resultList.
  // }

  const setMode = (mode) => {
    currentMode.value = mode;
  };

  summarizeResultsWhomToWho();
  summarizeResultsWhoToWhom();

  return {
    friends,
    checkNeed,
    setMode,
    currentMode,
    modes,
    resultListWhomToWho,
    resultListWhoToWhom,
  };
}
,
}
;
</script>