import {
    UPDATE_KEYWORD
} from '../actions/keyword';

const initialState = {
    filterText: ''
};

export default function keyword(state = initialState, action = {}) {
    switch (action.type) {
        case UPDATE_KEYWORD:
            return Object.assign({}, initialState, {filterText: action.payload.filterText});
        default:
            return state;
    }
}
