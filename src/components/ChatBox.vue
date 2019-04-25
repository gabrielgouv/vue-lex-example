<template>
    <div class="container">
        <h1>Lex Chatbot</h1>
        <br/>
        <div v-for="message in messages" :key="message.id" class="message" :class="message.isResponse ? 'response' : ''">
            {{ message.text }}
        </div>
        <br/>
        <br/>
        <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Enter a message..."
            rows="3"
            max-rows="6"
        ></b-form-textarea>
        <b-button @click="sendMessage()">Send</b-button>
    </div>
</template>

<script>
import { postText } from '../lex/lex.js'

export default {
    data() {
        return {
            text: '',
            messages: []
        }
    },
    methods: {
        sendMessage() {
            this.addMessage(this.text)
            postText(this.text, this.addResponse)
            this.text = ''
        },
        addMessage(text) {
            this.messages.push({
                id: this.messages.length + 1,
                text: text,
                isResponse: false
            })
        },
        addResponse(error, data) {
            if (error) {
                alert(error)
                return;
            }
            this.messages.push({
                id: this.messages.length + 1,
                text: data.message,
                isResponse: true
            })
        }
    }
}
</script>

<style>
    .message {
        width: 80%;
        float: left;
        background: #dddddd;
        margin: 5px;
        padding: 10px;
        text-align: left;
    }
    .response {
        float: right;
        color: #ffffff;
        background: #256cc9;
    }
</style>
