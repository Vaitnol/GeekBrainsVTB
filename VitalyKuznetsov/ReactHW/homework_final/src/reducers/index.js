//основной редюсер
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { chatsReducer } from './chats';

export const rootReducer = combineReducers({
    chats: chatsReducer
});

export const initReducer = history => combineReducers({
    router: connectRouter(history),
    chats: chatsReducer
});