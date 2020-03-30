import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import  { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history, initStore } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = initStore()

ReactDom.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <Switch>   
                    {routes.map((route, index) => <Route key={index} {...route} />)}
                </Switch>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);