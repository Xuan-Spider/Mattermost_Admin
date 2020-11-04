import React from 'react';
import ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './containers/App/App';
import rootReducer  from './reducers/index';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;


  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk)),
    );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);