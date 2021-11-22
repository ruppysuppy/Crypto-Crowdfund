type IOnAuthStateChanged = (
  user: {
    uid: string;
    username: string | null;
    photoURL: string | null;
  } | null,
) => void;

export { IOnAuthStateChanged };
