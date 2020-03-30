import React, { Component } from 'react';
import MenuAppBar from '../Header/Header';
import List from '@material-ui/core/List';
import SimpleList from '../ChatList/ChatList';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import './Messanger.css';

import { MessageList } from '../MessageList';
import { MessageField } from '../MessageField';
import { ChooseChat } from '../ChooseChat/ChooseChat';


export class Messanger extends Component {

    state = {
        chatName: ''
    }

    deleteChat = (id) => {
        
        this.setState(({chats}) => {
            
            const index = chats.findIndex((chat) =>chat.id === id );
            
            const before = chats.slice(0, index);
            const after = chats.slice(index + 1);

            const newArray = [...before, ...after];

            return {
                chats: newArray
            }

        })
    }

    handleChatAdd = () => {
        const {addChat, chats} = this.props;
        const {chatName} = this.state;
        const id = !chats.length ? 1 : chats[chats.length - 1].id + 1;
    
        addChat(id, chatName);
        this.setState({
            chatName: ''
        });
    };

    handleInputChange = (e) => {
        const chatName = e.target.name;
        this.setState({
            chatName
        });
    }

    render() {

        const { chats, messages, sendMessage, addChat, isLoading, isError } = this.props;

        if(isLoading) {
            return(<div>Loading...</div>)
        }
        if(isError) {
            return(<div>Попробуйте обновить страницу...</div>)
        }

        return (
            <div className='messanger'>
            <MenuAppBar />
            <div className='wrapper'>
                <div  id='simple'>
                    <List component="nav" aria-label="main mailbox folders">
                        {chats.map((chat, index) => <SimpleList {...chat} key={index} onDeleted={this.deleteChat} />)}
                    </List>
                    {/* <button onClick={addChat}></button> */}
                    <form className='chat-add' onSubmit={this.onSubmit}>
                        <TextField name="text" value={this.state.name} className='form-input' label="Введите имя чата" typr="text" onChange={this.handleInputChange} />
                        <Fab variant='round' size='small' color='primary' onClick={this.handleChatAdd}><Icon fontSize="large">add_circle</Icon></Fab>
                    </form>
                </div>
                <div className='chat-wrapper'>
                {messages ? <MessageList items={messages} /> : <ChooseChat />}
                {messages && <MessageField onSend={sendMessage} />}
                </div>
                </div>
            </div>
        )
    }
}