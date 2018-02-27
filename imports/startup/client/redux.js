import { createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';

import { BrowserRouter } from 'react-router-dom';

//import route reducer
import rootReducer from './reducers/index';

import comments from './import/coments';
import posts from './import/posts';

// create object with data

const defaultState = {
    posts: posts,
    comments, comments
}

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(BrowserRouter, store);

export default store;