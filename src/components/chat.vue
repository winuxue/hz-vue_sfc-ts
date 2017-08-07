<template>
  <div class="container">
    <div class="control">
      <input class="textarea title" v-model="newMessage" v-on:keyup.enter="addMessage" autofocus="true" />
    </div>
  
    <div class="columns is-vcentered is-mobile" v-for="message of messages" :key="message.id" transition="expand">
      <div class="column is-narrow">
        <img height="50px" width="50px" :src="message.url" />
      </div>
      <div class="column">
          {{ message.text }}
      </div>
       <div class="column is-narrow datetime is-hidden-mobile">
          {{message.datetime.toTimeString()}}
      </div> 
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Message } from '../state/message'

@Component
export default class Chat extends Vue {
  newMessage: ''
  get messages(): Message[] {
    return this.$store.state.messages;
  }
  get avatar(): string {
    return this.$store.state.avatar_url;
  }
  addMessage() {
    var text = this.newMessage.trim();
    if (text) {
      let message: Message = {
        text: text,
        datetime: new Date(),
        url: this.avatar
      };

      this.$store.commit('storeMessage', message);
      this.newMessage = '';
    }
  }
};
</script>
<<style>
.datetime {
  color: darkgrey;
}
.control{
  margin-bottom: 20px;
}
</style>