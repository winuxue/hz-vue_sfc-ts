<template>
    <div  class="container">
      <div id="input" class="row">
        <input class="u-full-width" v-model="newMessage" v-on:keyup.enter="addMessage" autofocus="true"/>
      </div>
      <div class="row">
        <ul>
          <li v-for="message of messages" :key="message.id" transition="expand" class="message">
            <img height="50px" width="50px" :src="message.url"/>
            <span class="text">
              {{ message.text }}
            </span>
            <span class="datetime u-pull-right">
              {{message.datetime.toTimeString()}}
            </span>
          </li>
        </ul>
      </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Message } from '../models/message'

@Component
export default class Chat extends Vue{
  newMessage: ''
  get messages():Message[] {
    return this.$store.state.messages;
  }
  get avatar():string{
    return this.$store.state.avatar_url;
  }
  addMessage() {
    var text = this.newMessage.trim();
    if (text) {        
      let message : Message = {
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
<style>
/* always present */
.expand-transition {
  transition: all .2s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}

/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}

ul {
  list-style-type: none;
}

.message {
  height: 50px;
}

.message img {
  vertical-align:middle;
}

.message .text {
  vertical-align:middle;
  margin-left:5px;
  font-family: 'Source Code Pro', "Raleway", "Helvetica Neue";
  font-size:20px;
}

.message .datetime {
  color:darkgrey;
}

#input input {
  height:100px;
  font-size:5rem;
  padding:10px;
  font-family: 'Source Code Pro', "Raleway", "Helvetica Neue";
}
</style>