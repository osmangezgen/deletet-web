import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });


export default createStore({
    state: {
        user: null,
        profil: null,
        userLikes: []
    },
    mutations: {
        setUser(state, user,){
            state.user = user;
        },
        setProfil(state, user,){
            state.profil = user;
        },
        logoutUser(state){
            state.user = null;
            state.profil = null;
            state.userLikes = [];
        },
        // addToLikes(state, value) {
        //     console.log(state.userLikes);
        //     if(state.userLikes.length>0 && state.userLikes.includes(value)== true){
        //       const order =  state.userLikes.indexOf(value);
        //       console.log(order);
        //         state.userLikes.splice(order);
        //         console.log('silindi',state.userLikes);
        //     }else{
        //         console.log('eklendi',state.userLikes);
        //         state.userLikes.push(value);
        //     }
            
        //   },
    },
    getters: {
        _isAuthenticated: state => state.user !== null,
        _getCurrentUser(state){
            const user = state.user;
            delete user?.password;
            return user;
        },
        _getCurrentProfil(state){
            const profil = state.profil;
            return profil;
        },
        // _userLikes(state){
        //     const likes = state.userLikes;
        //     return likes;
        // }
        _userLikes: state => state.userLikes || [],
    },
    plugins: [
        createPersistedState({
          storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
          }
        })
      ]
});