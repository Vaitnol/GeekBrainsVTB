import { CHATS_SEND, chatsSend } from 'actions/chats';

const timers = {};

export function robotMiddleware(store) {
    return function(next) {
        return function(action) {
            if(action.type === CHATS_SEND) {
                const { chatId, author } = action.payload;
                    if(author !== 'Robot') {
                    clearTimeout(timers[chatId]); //до того как устанавливается новый
                    timers[chatId] = setTimeout(() => {
                        store.dispatch(chatsSend({chatId, text: `Hey, ${author}! How is your React learning?`, author: 'Robot'}));
                    }, 3000);
                }
            }
            return next(action);
        }
    }
}