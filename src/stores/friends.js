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
        chooseDebtor(index, debtorName){
            const indexName = this.positions[index].debtors.indexOf(debtorName);
            if (indexName >= 0)
                this.positions[index].debtors.splice(indexName, 1);
            else
                this.positions[index].debtors.push(debtorName);

        },
        chooseAllDebtor(index){
            let allDebtors  = this.friends.map(friend => friend.name);
            console.log(allDebtors);
            if (this.positions[index].debtors.length !== allDebtors.length || !this.positions[index].debtors.every((val, idx) => val === allDebtors[idx])) {
                this.positions[index].debtors = allDebtors;
            }
            else
                this.positions[index].debtors = [];

        },
    }
});