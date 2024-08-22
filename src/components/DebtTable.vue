<template>
  <v-list-item class="pa-1 w-100">
    <div class="bgDark pa-2 rounded text-center text-white">
      <template v-if="checkNeed">
        <span>{{ userMessage }}</span>
        <v-divider />
        <v-table fixed-header class="bgDark">
          <thead>
          <tr>
            <th class="text-center text-white bgDark">Имя</th>
            <th class="text-center text-white bgDark">Сумма, руб.</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in list"
            :key="item.id"
          >
            <td class="text-white">{{ item.name }}</td>
            <td class="text-white">{{ item.sum }}</td>
          </tr>
          </tbody>
        </v-table>
      </template>
      <template v-else>
        <span>{{ emptyMessage }}</span>
      </template>
    </div>
  </v-list-item>
</template>

<script>
export default {
  name: 'DebtTable',
  props: {
    list: {
      type: Array,
      required: true
    },
    checkNeed: {
      type: Boolean,
      required: true
    },
    userMessage: {
      type: String,
      required: true
    },
    emptyMessage: {
      type: String,
      required: true
    }
  }
}
</script>
