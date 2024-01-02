import { coockiesActions } from './coockies';

function rand() {
    return Math.random().toString(36).substr(2); // remove `0.`
}

function tokenGenerator() {
    return rand() + rand(); // to make it longer
}

export function readUserCoockie() {
    return async (dispatch) => {
        const result = await window.cookieStore.get('user-token');
        let token;
        if (result === null) {
            token = tokenGenerator();
            await window.cookieStore.set('user-token', token);
        } else {
            token = result.value;
        }

        dispatch(coockiesActions.init(token));
    };
}
