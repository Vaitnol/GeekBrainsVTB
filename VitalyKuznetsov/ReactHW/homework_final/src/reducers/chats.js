//обработка сообщений 
import update from 'react-addons-update';
import { CHATS_LOAD, CHATS_SEND, CHATS_ADD, CHATS_DELETE, CHATS_ACTIVE, CHATS_INACTIVE, CHATS_REQUEST, CHATS_SUCCESS, CHATS_FAIL } from 'actions/chats';

const dataBackend = {
    '1': {
        id: 1,
        link: '/chats/1',
        name: 'Mom',
        read: false,
        messages: [
            {text: 'Welcome to 1st chat', author: 'Robot'}
        ]
    },
    '2': {
        id: 2,
        link: '/chats/2',
        name: 'Best friend',
        read: false,
        messages: [
            {text: 'Welcome to 2st chat', author: 'Robot'}
        ]
    },
    '3': {
        id: 3,
        link: '/chats/3',
        name: 'Grnadma',
        read: false,
        messages: [
            {text: 'Welcome to 3st chat', author: 'Robot'}
        ]
    },
    '4': {
        id: 4,
        link: '/chats/4',
        name: 'Teacher',
        read: false,
        messages: [
            {text: 'Welcome to 4st chat', author: 'Robot'}
        ]
    },
}; //делаем исскуственный бэкэнд

const initialState = {
    loading: false,
    entries: {} //объект с чатами dataBackend
};

export const chatsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHATS_LOAD: 
            return { //создаём объект для иммутабельности
                ...state,
                entries: dataBackend //переписываем entries
            }
        case CHATS_SEND:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {$push: [{
                            text: action.payload.text,
                            author: action.payload.author
                        }]}
                    }
                }
            });
        case CHATS_ADD:
            const { name, chatId } = action.payload; 
            return update(state, {
                entries: {$merge: {
                    [chatId]: {
                        id: chatId,
                        messages: [],
                        name
                    }
                }}
            });
        case CHATS_DELETE: 
            const id = action.payload;
            const newState = {
                ...state,
                entries: {
                    ...state.entries
                }
            }
            delete newState.entries[id];
            return newState;

        case CHATS_ACTIVE: { //скобки, чтобы не было конфликта
            const chatId = action.payload;
            return update(state, {
                entries: {
                    [chatId]: {
                        $merge: {
                            read: true
                        }
                    }
                }
            });
        }
        case CHATS_INACTIVE: { 
            const chatId = action.payload;
            if(!state.entries[chatId]) return state;
            return update(state, {
                entries: {
                    [chatId]: {
                        $merge: {
                            read: false
                        }
                    }
                }
            });
        }
        //api
        case CHATS_REQUEST: 
            return {
                ...state,
                loading: true,
                error: false
            } 
        case CHATS_SUCCESS: 
            return {
                ...state,
                loading: false,
                entries: action.payload
            }
        case CHATS_FAIL: 
            return {
                ...state,
                loading: false,
                error: true
            }
        default: 
            return state
    }
}
