import { defineStore } from 'pinia';

export const useFriendsStore = defineStore('friends', {
    state: () => ({
        friends: [{ name: '' }, {name: 'Коля'}, {name: 'Петя'},{name: 'Биба'},{name: 'Боба'}],
        positions: [{ name: '', price: '', payerName: 'Плательщик', debtors: ['']}],
        selectedPositionIndex: null,
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
        },
        choosePayer(index, payerName) {
            this.positions[index].payerName = payerName;
        },
        setSelectedPositionIndex(index) {
            this.selectedPositionIndex = index;
        },
        chooseDebtor(index, payerName){
            this.positions.get(index)
        },
        chooseAllDebtor(index, payerName){
            this.positions.get(index)
        }
    }
});