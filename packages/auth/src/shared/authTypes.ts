type IOnAuthStateChanged = (
  user: {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
  } | null,
) => void;

export { IOnAuthStateChanged };
