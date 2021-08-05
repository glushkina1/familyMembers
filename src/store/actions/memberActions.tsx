import AsyncStorage from "@react-native-async-storage/async-storage";
import {SET_MEMBERS} from "../types";
import {RootState, store} from "../index";
import {STORAGE_KEYS} from "../../../constans";


// Get Members
export const getMembers = (onSuccess = () => {}, onError = () => {}) => {
    return async dispatch => {
        try {
            const membersRes = await AsyncStorage.getItem(STORAGE_KEYS.members);
            const members = membersRes ? JSON.parse(membersRes) : [];

            dispatch({
                type: SET_MEMBERS,
                payload: members,
            });
            onSuccess();
        } catch (err) {
            console.log(err);
            onError();
        }
    };
};

// Create new member
export const createMember = (name, onSuccess = () => {}, onError = () => {}) => {
    return async dispatch => {
        try {
            const newMember = {
                name: name,
                id: `member-${new Date().getTime()}`
            };
            const {members} = store.getState().members;
            const membersCope = [...members];
            membersCope.push(newMember);

            console.log('ADDING');
            console.log(membersCope);
            await AsyncStorage.setItem(STORAGE_KEYS.members, JSON.stringify(membersCope));
            dispatch({
                type: SET_MEMBERS,
                payload: membersCope,
            });
            onSuccess();
        } catch (err) {
            console.log(err);
            onError();
        }
    }
};
// Update member
    export const updateMember = (member, onSuccess = () => {}, onError = () => {}, state: RootState) => {
        return async dispatch => {
            try {
                const { members } = state.members;
                const updatedMembers = [...members].map(t => t.id === member.id ? member : t);
                await AsyncStorage.setItem(STORAGE_KEYS.members, JSON.stringify(updatedMembers));

                dispatch({
                    type: SET_MEMBERS,
                    payload: updatedMembers,
                });
                onSuccess();
            } catch (err) {
                console.log(err);
                onError();
            }
        };
}

// Delete member
export const deleteMember = (id, onSuccess = () => {}, onError = () => {}, state: RootState) => {
    return async dispatch => {
        try {
            const { members } = state.members;
            const updatedMembers = [...members].filter(t => t.id !== id);
            await AsyncStorage.setItem(STORAGE_KEYS.members, JSON.stringify(updatedMembers));

            dispatch({
                type: SET_MEMBERS,
                payload: updatedMembers,
            });
            onSuccess();
        } catch (err) {
            console.log(err);
            onError();
        }
    };
};