import Vue from "vue";
import Vuex from 'vuex'
import { Message } from '../state/message'
import Horizon from '@horizon/client';

Vue.use(Vuex);

const horizon = Horizon();
const chat = horizon('chat');

const store = new Vuex.Store({
  state: {
    messages:[],
    avatar_url: ''
  },
  mutations: {
    storeMessage (state: any, msg: Message) {
      chat.store(msg);
    },
    setMessages (state: any, msgs: Message[]) {
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