import Vue from "vue";
import Vuex from 'vuex'
import ChatComponent from './components/chat.vue';
import store from './store/chat';

Vue.use(Vuex);
store.commit('setAvatar',`http://api.adorable.io/avatars/50/${new Date().getMilliseconds()}.png`);

new Vue({
  el: '#app',
  store,
  components:{ ChatComponent },
  template: '<chat-component/>'
});

// Image preloading
const image = new Image();
image.src = store.state.avatar_url;