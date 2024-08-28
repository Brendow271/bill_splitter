<template>
  <div class="split-page d-flex justify-center align-center flex-column mt-3">
    <div class="border-solid list">
      <h1 class="d-flex justify-center text-white" id="Split">Чек</h1>
      <v-divider/>
      <v-list>
        <v-list-item
            v-for="(position, index) in positions"
            :key="position.id"
            class="text-white"
        >
          <div class="d-flex">
            <v-text-field
                variant="outlined"
                v-model="position.name"
                placeholder="Название позиции"
                class="positionName mr-3"
            />

            <v-text-field
                variant="outlined"
                v-model="position.price"
                type="number"
                placeholder="Цена"
                suffix="руб."
                class="positionPrice"
            />

            <v-btn
                @click="toggleDetails(index)"
                class="mt-1 mr-1 ml-3 bgDark"
            >
              <v-img
                  :src="getImageUrl(index)"
                  alt="Arrow Down or Up"
                  width="30"
              />
            </v-btn>
          </div>

          <v-expand-transition>
            <div v-show="expandedIndex === index" class="w-100">
              <div class="d-flex justify-space-between">
                <v-dialog class="w-75">
                  <template #activator="{ props: activatorProps }">
                    <v-btn
                        v-bind="activatorProps"
                        class="bgDark dropDown"
                    >
                      <v-img
                          src="../../public/icons/Wallet.svg"
                          alt="Кошелек"
                          width="30"
                          class="mx-3"
                      />
                      <span class="text-white">{{ position.payerName }}</span>
                    </v-btn>
                  </template>

                  <template #default="{ isActive }">
                    <v-card title="Выберите плательщика"
                            class="bgPrime ma-auto text-white"
                            min-width="70%"
                            max-height="60%">
                      <v-divider/>
                      <Popup :selected-payer="position.payerName" @update-payer="updatePayer(index, $event)"/>
                      <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            text="Закрыть окно"
                            @click="isActive.value = false"
                            class="text-white"
                        />
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>

                <v-btn
                    class="w-auto bgDark dropDown"
                    @click="copyPosition(index)"
                >
                  <v-img
                      src="../../public/icons/Copy.svg"
                      alt="Копия"
                      width="30"
                  />
                </v-btn>

                <v-btn
                    class="w-auto bgDark dropDown"
                    @click="removePosition(index)"
                >
                  <v-img
                      src="../../public/icons/Trash.svg"
                      alt="Корзина"
                      width="30"
                  />
                </v-btn>
              </div>
              <span>Выбрать должников:</span>

              <div class="d-flex justify-center">
                <div class="d-flex flex-column pa-1">
                  <v-btn
                      block
                      class="iconName"
                      @click="chooseAllDebtor(index)"
                  >
                    <template v-if="!checkSelectedAllDebtor(index)">
                      {{ getAvatarText() }}
                    </template>
                    <v-img
                        src="../../public/icons/CheckMark.svg"
                        alt="Галочка"
                        width="30"
                        v-if="checkSelectedAllDebtor(index)"
                    />
                  </v-btn>
                  <span class="d-flex justify-center text-white">Все</span>
                </div>
                <v-list class="pa-0 d-flex">
                  <v-list-item
                      v-for="(friend) in friends"
                      :key="friend.id"
                      class="pa-1"
                  >
                    <div class="d-flex flex-column pa-0">
                      <v-btn
                          block
                          class="iconName"
                          @click="chooseDebtor(index, friend.name)"
                      >
                        <v-container
                            v-if="!checkSelectedDebtor(index, friend.name)"
                            v-text="getAvatarText(friend.name)"
                        />
                          <v-img
                            src="../../public/icons/CheckMark.svg"
                            alt="Галочка"
                            width="30"
                            v-if="checkSelectedDebtor(index, friend.name)"
                        />
                      </v-btn>
                      <span class="d-flex justify-center text-white">{{ friend.name }}</span>
                    </div>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </v-expand-transition>
        </v-list-item>
      </v-list>

      <v-row>
        <v-col class="d-flex justify-center mb-3">
          <v-btn
              @click="addPosition"
              class="btnNext text-white"
              text="+"
          />
        </v-col>
      </v-row>
      <v-divider/>
     <span class="text-white d-flex justify-end" id="finalValue">Итого: {{ total }} руб.</span>
    </div>
    <v-btn
        v-if="canProceed"
        :to="{ name: 'Result' }"
        text="Далее"
        class="btnNext text-white mt-3"
    />
  </div>
</template>

<script>
import { useFriendsStore } from '@/stores/friends';
import { ref, computed } from 'vue';
import Popup from "@/components/PopupChoosePayer.vue";

export default {
  name: 'Split',
  components: { Popup },
  setup() {
    const friendsStore = useFriendsStore();

    const expandedIndex = ref(null);

    const toggleDetails = (index) => {
      if (expandedIndex.value === index) {
        expandedIndex.value = null;
        friendsStore.setSelectedPositionIndex(null);
      } else {
        expandedIndex.value = index;
        friendsStore.setSelectedPositionIndex(index);
      }
    };

    const addPosition = () => {
      friendsStore.addPosition({ name: '', price: '', payerName: 'Плательщик', debtors: [] });
    };

    const removePosition = (index) => {
      friendsStore.removePosition(index);
    };

    const copyPosition = (index) => {
      friendsStore.copyPosition(index);
    };

    const total = computed(() => {
      return friendsStore.positions.reduce((sum, position) => sum + parseFloat(position.price || 0), 0);
    });

    const getImageUrl = (index) => {
      return expandedIndex.value === index ? '../../public/icons/ArrowUp.svg' : '../../public/icons/ArrowDown.svg';
    };

    const getAvatarText = (name) => {
      return name ? name.charAt(0).toUpperCase() : 'All';
    };

    const chooseAllDebtor = (index) => {
      friendsStore.chooseAllDebtor(index);
    };

    const chooseDebtor = (index, debtorName) => {
      friendsStore.chooseDebtor(index, debtorName);
    };

    const checkSelectedAllDebtor = computed(() => (index) => {
      const allDebtors = friendsStore.friends.map(friend => friend.name);
      const debtors = friendsStore.positions[index].debtors;

      return allDebtors.every(friend => debtors.includes(friend));
    });

    const checkSelectedDebtor = computed(() => (index, debtorName) => {
      return friendsStore.positions[index].debtors.includes(debtorName);
    });

    const canProceed = computed(() => {
      return friendsStore.positions.every(position => {
        return position.name.trim() !== '' &&
            position.price > 0 &&
            position.payerName !== 'Плательщик' &&
            position.debtors.length > 0;
      });
    });

    const updatePayer = (index, payerName) => {
      friendsStore.positions[index].payerName = payerName;
    };

    return {
      friends: friendsStore.friends,
      positions: friendsStore.positions,
      expandedIndex,
      toggleDetails,
      addPosition,
      removePosition,
      copyPosition,
      total,
      getImageUrl,
      getAvatarText,
      chooseAllDebtor,
      chooseDebtor,
      checkSelectedAllDebtor,
      checkSelectedDebtor,
      canProceed,
      updatePayer,
    };
  }
}
</script>