import { getAuth } from '@firebase/auth';
import React from 'react';

import { IUser } from '../../../../interfaces/user';
import { getFirebaseApp } from '../../../../shared/firebase';

import classes from './accountDetailsContainer.module.css';
import sharedClasses from '../../../../common.module.css';

interface IProps {
  user: IUser;
}

export default function AccountDetailsContainer({ user }: IProps) {
  const firebaseApp = getFirebaseApp()!;
  const auth = getAuth(firebaseApp);

  return (
    <div className={classes.accountDetailsContainer}>
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

        {auth.currentUser && auth.currentUser.uid === user?.uid && (
          <button className={`${classes.editButton} ${sharedClasses.h2}`}>
            <i className="far fa-edit" />
          </button>
        )}
      </div>
    </div>
  );
}
