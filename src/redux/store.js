import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import initialState from './initialState';
import tablesReducer from './tableRedux';
import menuReducer from './menuReducer';

const reducer = (state, action) => {
    const newState = {
        tables: tablesReducer(state, action),
        // menuTable: menuReducer(state, action)
    }
    console.log('New state exit:', newState);
    // debugger
    return newState;
}

const store = createStore(
  reducer,
  initialState,

  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;