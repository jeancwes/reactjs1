import { createStore, combineReducers } from 'redux';
import { clientReducer } from './reducers/client';
import { planReducer } from './reducers/plan';

const reducers = combineReducers({
    clients: clientReducer,
    plans: planReducer
});

function store() {
    return createStore(reducers)
}

export default store;
