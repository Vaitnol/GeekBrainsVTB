import React, { Component } from 'react';
import './MessagePage';
import { MessageList } from '../MessageList/MessageList';
import { MessageField } from '../MessageField/MessageField';



export class MessagePage extends Component {

    state = {
        messages: [],
        text: '',
        author: ''
    }

    componentDidUpdate() {
        const { author } = this.state.messages[this.state.messages.length - 1];
        if(author !== 'Robot'){
            setTimeout(() => {
                if(this.state.messages[this.state.messages.length - 1].author !== 'Robot') {
                    this.robotMessages();
                }
            }, 1000);
        }
    } 

    get messages() {
        const { chats } = this.props;
        const { match } = this.props;

        let messages = null;

        if(match && chats[match.params.id]) {
            messages = chats[match.params.id]
        }
        
        return messages;
        console.log(messages)
    }

    handleMessageSend = (message) => {
        const { chats } = this.props;
        const { match } = this.props;
        
        const chat = chats[match.params.id];
        const messages = this.messages.concat([message]);
        chat.messages = messages;

/*         this.setState((state) => {
            return {messages: [...state.messages, message], author: '', text: ''}
        }); */

        this.setState({
            chats: {
                ...this.props.chats,
                [match.params.id]: id
            }
        });
    }

    robotMessages = () => {
        this.setState((state) => {
            return {messages: [...state.messages, {author: 'Robot', text: 'Hello'}],
            }
        });
    }

    render() {

        const { messages, text, author } = this.state;

        return (
            <div>
                <MessageList items={messages} />
                <MessageField onSend={this.handleMessageSend} text={text} author={author}/>
            </div>
        )
    }
}
