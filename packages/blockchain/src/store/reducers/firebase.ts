import { FirebaseReducerAction } from '../../enums/firebase';
import { IFirebaseAction, IFirebaseState } from '../../interfaces/firebase';

const initialState: IFirebaseState = {
  firebaseApp: null,
};

const reducer = (
  state: IFirebaseState = initialState,
  action: IFirebaseAction,
) => {
  const { type, payload } = action;

  switch (type) {
    case FirebaseReducerAction.SET_FIREBASE_APP:
      if (payload?.firebaseApp) {
        return {
          ...state,
          firebaseApp: payload.firebaseApp,
        };
      }
      return { ...state };

    default:
      return { ...state };
  }
};

export default reducer;
