import { getAuth } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';

import Button from '../../../ui/Button/Button';
import ErrorBanner from '../../../ui/ErrorBanner/ErrorBanner';
import Input from '../../../ui/Input/Input';
import Spinner from '../../../ui/Spinner/Spinner';
import { IEditUser, IUser } from '../../../../interfaces/user';
import { getFirebaseApp } from '../../../../utils/firebase';
import { checkUrlImage } from '../../../../utils/regex';

import classes from './accountDetailsContainer.module.css';
import sharedClasses from '../../../../common.module.css';

interface IProps {
  user: IUser;
  setUser: (user: IUser) => void;
}

export default function AccountDetailsContainer({ user, setUser }: IProps) {
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [photoUrlError, setPhotoUrlError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedUser, setEditedUser] = useState<IEditUser>({
    username: user.username,
    photoUrl: user.photoUrl,
    website: user.website,
  });
  const firebaseApp = getFirebaseApp()!;
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const validate = () => {
    let isValid = true;
    setPhotoUrlError('');
    setUsernameError('');

    if (editedUser.username.trim() === '') {
      setUsernameError('Invalid Username');
      isValid = false;
    }
    if (editedUser.photoUrl && !checkUrlImage(editedUser.photoUrl.trim())) {
      setPhotoUrlError('Invalid Photo URL');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!validate()) {
      return;
    }
    setIsLoading(true);
    try {
      if (user.uid === auth.currentUser!.uid) {
        const data: { [key: string]: string } = {};
        for (const key in editedUser) {
          if (editedUser[key]) {
            data[key] = editedUser[key];
          }
        }
        await updateDoc(doc(firestore, 'users', auth.currentUser!.uid), data);
        setUser({ ...user, ...data });
        setIsEditing(false);
      }
    } catch (error) {
      console.log('[ERROR]', error);
      // @ts-ignore
      setError(error.code);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.accountDetailsContainer}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isEditing ? (
            <form className={classes.inputContainer} onSubmit={handleSubmit}>
              <Input
                placeholder="Username"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
                error={!!usernameError}
                helperText={usernameError}
                fullwidth
              />
              <Input
                placeholder="Photo URL"
                name="photoUrl"
                value={editedUser.photoUrl}
                onChange={handleChange}
                error={!!photoUrlError}
                helperText={photoUrlError}
                fullwidth
              />
              <Input
                placeholder="Website"
                name="website"
                value={editedUser.website}
                onChange={handleChange}
                fullwidth
              />

              {error && <ErrorBanner>{error}</ErrorBanner>}

              <Button type="submit" className={classes.button}>
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </form>
          ) : (
            <>
              <div className={classes.profilePicContainer}>
                {user?.photoUrl ? (
                  <img
                    className={classes.profilePic}
                    src={user?.photoUrl}
                    alt="profile-picture"
                  />
                ) : (
                  <h1 className={`${sharedClasses.h1} ${classes.placeholder}`}>
                    {user?.username[0].toUpperCase()}
                  </h1>
                )}
              </div>
              <div className={classes.infoContainer}>
                <h2 className={sharedClasses.h2}>{user!.username}</h2>
                {user!.website && (
                  <>
                    <a
                      href={user.website}
                      className={`${sharedClasses.g} ${sharedClasses.link}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i
                        className={`fas fa-globe-americas ${sharedClasses.h4}`}
                      />
                      {user.website}
                    </a>
                  </>
                )}
              </div>
            </>
          )}

          {auth.currentUser &&
            auth.currentUser.uid === user?.uid &&
            !isEditing && (
              <button
                className={`${classes.editButton} ${sharedClasses.h2}`}
                onClick={() => setIsEditing(true)}
              >
                <i className="fas fa-edit" />
              </button>
            )}
        </>
      )}
    </div>
  );
}
