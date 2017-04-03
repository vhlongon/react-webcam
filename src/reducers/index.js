import { combineReducers } from 'redux';
import ImagesReducer from './reducer_images';
// import WebcamReducer from './reducer_webcam';


const rootReducer = combineReducers({
    images: ImagesReducer
});

export default rootReducer;
