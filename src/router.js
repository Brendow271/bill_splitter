import Home from "@/views/HomePage.vue"
import FriendList from "@/views/FriendList.vue";
import Split from "@/views/SplitBill.vue";
import Result from "@/views/ResultPage.vue";

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/split',
            name: 'Split',
            component: Split
        },
        {
            path: '/friendList',
            name: 'FriendList',
            component: FriendList
        },
        {
            path: '/result',
            name: 'Result',
            component: Result
        }
    ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

