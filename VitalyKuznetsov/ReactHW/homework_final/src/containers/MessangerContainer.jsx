//отсюды вызываем actions
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { Messanger } from 'components/Messanger';
import { chatsLoad, chatsSend, chatsAdd, chatsLoad2 } from 'actions/chats';

class MessangerContainer extends Component {

    componentDidMount() { //loadCHats попало в props
        const { loadChats} = this.props;
        if(!this.props.chats.length) {
            loadChats();
        }
    }

    handleMessageSend = (message) => {
        const { sendMessage, chatId } = this.props;
        //console.log(match.params.id)
        sendMessage({
            ...message,
            chatId
        });
    }

    
    render() {
        const  {chats, messages, isLoading, isError} = this.props;
        console.log(this.props);
        return (
            <Messanger isLoading={isLoading} isError={isError} chats={chats} messages={messages} sendMessage={this.handleMessageSend} addChat={this.props.state}/>
        );
    }
}

//автоматом передаем чаты и сообщения
function mapStateToProps(state, ownProps) {
    const chats = state.chats.entries; //получаем чаты по ключу
    const { match } = ownProps;

    let messages = null;
    if(match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;
    }

    //перебираем чаты
    let chatsArrayForShow = [];
    for(let key in chats) {
        if(chats.hasOwnProperty(key)) {
            chatsArrayForShow.push({name: chats[key].name, link: `/chats/${chats[key].id}`, read: chats[key].read}); //просто выводим в компоненте
        }
    }

    const newId = Object.keys(chats).length ? Object.keys(chats).length : 0;
    const newChatId = newId + 1;

    //возвращаем то что попадает из props
    return {
        chats: chatsArrayForShow,
        messages,
        chatId: match ? match.params.id : null,
        newChatId,
        isLoading: state.chats.loading,
        isError: state.chats.error
    }
}

//передаем данные 
function mapDispatchToProps(dispatch) {
    return {
        loadChats: () => dispatch(chatsLoad2()), //сигнал
        sendMessage: (message) => dispatch(chatsSend(message)),

        addChat: (newChatId, chatName) => dispatch(chatsAdd(newChatId, chatName)),
        redirect: (id) => dispatch(push(`/chats/${id}`)) //передаём новый id
    }
}

export const MessangerRedux = connect(mapStateToProps, mapDispatchToProps)(MessangerContainer);