import { defineStore } from 'pinia'

export const useUserStore = defineStore('user',{
    state: () =>({
        id: '',
        name:'',
        bio:'',
        email:'',
        RegistrationDate: new Date,
        image:'',
    }),
    actions: {
        //
    },
    persist:true,
})