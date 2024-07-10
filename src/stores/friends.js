import { defineStore } from 'pinia';

export const useFriendsStore = defineStore('friends', {
    state: () => ({
        friends: [{ name: '' }],
        positions: [{ name: '', price: 0 }] // Начальная пустая позиция
    }),
    actions: {
        addFriend() {
            this.friends.push({ name: '' });
        },
        removeFriend(index) {
            this.friends.splice(index, 1);
        },
        addPosition(position) {
            this.positions.push(position);
        },
        removePosition(index) {
            this.positions.splice(index, 1);
        }
    }
});