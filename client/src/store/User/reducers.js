import {handleActions} from 'redux-actions';
import {User} from './User';

export const userReducer = handleActions({},
    new User()
);
