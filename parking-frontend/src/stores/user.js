import { defineStore } from 'pinia'

export const useUserStore = defineStore({

    id: 'user',

    state: () => ({
        user: {
            access: null,
            isAuthenticated: false,
        }
    }),

    actions: {

        initStore() {

            console.log('token', this.user.access, 'auth?', this.user.isAuthenticated)

            if (localStorage.getItem('user.access')) {
                this.user.access = localStorage.getItem('user.access')
                this.user.isAuthenticated = true
                
            }
            
        },

        removeToken() {
            this.user.access = null
            this.user.isAuthenticated = false
            localStorage.setItem('user.access', '')
        },

        // setUserInfo(user) {

        //     this.user.id = user.id
        //     this.user.name = user.name
        //     this.user.email = user.email

        //     localStorage.setItem('user.id', this.user.id)
        //     localStorage.setItem('user.name', this.user.name)
        //     localStorage.setItem('user.email', this.user.email)

        // },

    },

})