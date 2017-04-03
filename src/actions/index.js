import { IMAGES } from './constants';
import { DB } from '../firebase';
import uuid from 'uuid';

// action creator to fetch all entries on firebase
export const getImages = () => {
    return dispatch => {
        DB.ref('/images').on('value', snapshot => {
            const data = snapshot.val();

            const images = data ? 
                Object.keys(data).map(key => data[key])
                .sort((a, b) => b.date - a.date ) :
                [];
            dispatch({
                type: IMAGES.SUCCESS,
                data: images
            });
        });
    };
}

export const postImage = snap => {
    const k = uuid.v4();
    const DB_CHILD_REF = DB.ref().child('images');
    const POST_KEY = DB_CHILD_REF.child(k).key;
    return dispatch => DB_CHILD_REF.child(POST_KEY).update({...snap, key: k, date: Date.now()});
}