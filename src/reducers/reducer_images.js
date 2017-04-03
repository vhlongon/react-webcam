import { IMAGES } from '../actions/constants';

const INITIAL_STATE = {
    data: [],
    error: null
};

export default function (state = INITIAL_STATE, action) {
    const {type} = action;
    const {REQUEST, SUCCESS, FAILURE} = IMAGES;
    switch (type) {
        case REQUEST:
            return state;
        case SUCCESS:
            return { ...state, data: action.data };

        case FAILURE:
            return { ...state, error: action.error };

        default:
            return state;
    }
}