export interface IUser {
  uid: string;
  username: string;
  photoUrl?: string;
  website?: string;
}

export interface IEditUser {
  username: string;
  photoUrl?: string;
  website?: string;
}
