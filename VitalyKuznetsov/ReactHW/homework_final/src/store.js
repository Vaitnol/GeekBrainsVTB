import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from 'reducers';
import logger from 'redux-logger'; //middleware
import { loggerMiddleware } from 'middlewares/logger';
import { robotMiddleware } from 'middlewares/robot';
import { createBrowserHistory } from 'history';
import { initReducer } from 'reducers';
import { routerMiddleware } from 'connected-react-router'; 
import { chatActiveMiddleware } from 'middlewares/chatActive';
import { apiMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

export const history = createBrowserHistory();

const persistConfig = {
    key: 'root',
    storage
};

export function initStore() {
    const initialStore = {};
    const store = createStore(
        persistReducer(persistConfig, initReducer(history)),
        initialStore,
        composeWithDevTools(
            applyMiddleware(loggerMiddleware, robotMiddleware, chatActiveMiddleware, apiMiddleware,routerMiddleware(history))
        )
    );

    const persistor = persistStore(store);
    return {store, persistor};
}




//export const store = createStore(initReducer(history), applyMiddleware(loggerMiddleware, robotMiddleware, routerMiddleware(history)));

//export const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, robotMiddleware));
//export const store = createStore(rootReducer, applyMiddleware(logger));

//export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//console.log(store.getState())