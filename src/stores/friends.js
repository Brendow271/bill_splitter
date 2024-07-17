import { defineStore } from 'pinia';

export const useFriendsStore = defineStore('friends', {
    state: () => ({
        friends: [{ name: '' }],
        positions: [{ name: '', price: 0, payerName: 'Плательщик'}] // Начальная пустая позиция
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
        },
        copyPosition(index){
            let copiedElement = { ...this.positions[index] };
            this.positions.splice(index + 1, 0, copiedElement);
        }
        // choosePayer(index, payerName){
        //     this.positions.get(index)
        // }
    }
});