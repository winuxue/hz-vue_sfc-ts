import Vue from "vue";
import ChatComponent from './components/chat.vue';

declare var Horizon: any;
const horizon = Horizon();
const chat = horizon('chat');

const app = new Vue({
  el: '#app',
  template: '<chat-component :avatar="avatar_url" :messages="messages" v-on:storeMessage="storeMessage"/>',
  data: { 
    avatar_url: `http://api.adorable.io/avatars/50/${new Date().getMilliseconds()}.png`,
    messages:[]
  },
  components:{
    ChatComponent
  },
  methods: {
    storeMessage(msg: any) {
      chat.store(msg).subscribe();
    }
  }
});

chat.order('datetime', 'descending')
  .limit(8)
  .watch()
  .subscribe(function(msgs:any){
    app.messages = msgs;
  });

// Image preloading
const image = new Image();
image.src = app.avatar_url;