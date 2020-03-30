import { createAction } from 'redux-api-middleware';

export const CHATS_SEND = 'CHATS_SEND';
export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_ADD = 'CHATS_ADD';
export const CHATS_ACTIVE = 'CHATS_ACTIVE';
export const CHATS_INACTIVE = 'CHATS_INACTIVE';
export const CHATS_DELETE = 'CHATS_DELETE;'

export const chatsLoad = () => ({
    type: CHATS_LOAD // попадаеи в action
}); //action

export const chatsSend = (message) => ({ //message берётся из контейнера
    type: CHATS_SEND,
    payload: message  // пробрасываем сообщение
});//action

export const chatsAdd = (chatId, name) => ({
    type: CHATS_ADD,
    payload: {chatId, name}
});

export const chatsActive = (chatId) => ({
        type: CHATS_ACTIVE,
        payload: chatId
});

export const chatsInActive = (chatId) => ({
    type: CHATS_INACTIVE,
    payload: chatId
});

export const chatsDelete = (id) => {
    return {
      type: DELETE_CHAT,
      payload: id
    }
  };

export const CHATS_REQUEST = 'CHATS_LOAD/CHATS_REQUEST';
export const CHATS_SUCCESS = 'CHATS_LOAD/CHATS_SUCCESS';
export const CHATS_FAIL = 'CHATS_LOAD/CHATS_FAIL';

export const chatsLoad2 = () => createAction({
    endpoint: '/api/chats.json',
    method: 'GET',
    headers: {'Content-type': 'application/json'},
    types: [
        CHATS_REQUEST,
        CHATS_SUCCESS,
        CHATS_FAIL
    ]
});