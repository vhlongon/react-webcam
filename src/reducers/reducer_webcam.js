import { WEBCAM } from '../actions/constants';

const INITIAL_STATE = {
    
};

export default function (state = INITIAL_STATE, action) {
    const {type} = action;
    const {REQUEST, SUCCESS, FAILURE} = WEBCAM;
    switch (type) {
        case REQUEST:
            return state;

        case SUCCESS:
            return { ...state };

        case FAILURE:
            return { ...state };

        default:
            return state;
    }
}