/// <reference path="horizon/index.d.ts" />

import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex);

// declare var Horizon: any;
import Horizon from '@horizon/client';
// import * as Horizon from '@horizon/client/src';

const horizon = Horizon();
const chat = horizon('chat');

const store = new Vuex.Store({
  state: {
    messages:[],
    avatar_url: ''
  },
  mutations: {
    storeMessage (state: any, msg: any) {
      chat.store(msg).subscribe();
    },
    setMessages (state: any, msgs: any) {
      state.messages = msgs;
    },
    setAvatar (state: any, url: string) {
      state.avatar_url = url;
    }
  }
});

chat.order('datetime', 'descending')
  .limit(10)
  .watch()
  .subscribe(function(msgs:any){
    store.commit('setMessages', msgs);
  });

  export default store;