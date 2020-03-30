import { CHATS_SEND, chatsActive, chatsInActive } from 'actions/chats';

export const chatActiveMiddleware = store => next => action => {
    if(action.type === CHATS_SEND) {
        next(action);
        const { chatId } = action.payload;
        if(store.getState().router.location.pathname !== `/chats/${chatId}`) {
            store.dispatch(chatsActive(chatId));
        }
    } else if(action.type === '@@router/LOCATION_CHANGE') {
        next(action);
        const chatId = action.payload.location.pathname.split('/')[2];
        if(typeof(chatId) !== 'undefined') {
            store.dispatch(chatsInActive(chatId));
        }
    } else {
        next(action);
    }
};