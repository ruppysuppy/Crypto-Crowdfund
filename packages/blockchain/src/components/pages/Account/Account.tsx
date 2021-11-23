import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import AccountDetailsContainer from './AccountDetailsContainer/AccountDetailsContainer';
import Layout from '../../hoc/Layout';
import Spinner from '../../ui/Spinner/Spinner';
import { IRoutes } from '../../../interfaces/routes';
import useQuery from '../../../hooks/useQuery';
import { IUser } from '../../../interfaces/user';
import { getFirebaseApp } from '../../../utils/firebase';

import classes from './account.module.css';

interface IProps {
  routes: IRoutes;
}

export default function Account({ routes }: IProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  const query = useQuery();
  let uid = query.get('uid');
  const redirectComponent = <Redirect to={routes.CAMPAIGNS} />;

  const firebaseApp = getFirebaseApp()!;
  const firestore = getFirestore(firebaseApp);

  useEffect(() => {
    const getUser = async () => {
      // workaround for micro-frontend architecture query params
      if (!uid) {
        const url = new URL(window.location.href);
        const param = url.searchParams.get('uid');
        if (!param) {
          setIsLoading(false);
          return;
        }
        uid = param;
      }

      try {
        const userDoc = await getDoc(doc(firestore, 'users', uid));
        const userData = userDoc.exists()
          ? { ...(userDoc.data() as IUser), uid: userDoc.id }
          : null;
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    getUser();
  }, []);

  if (!isLoading && !user) {
    return redirectComponent;
  }

  return (
    <Layout faqLink={routes.FAQ}>
      <div>
        {isLoading ? (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <>
            <AccountDetailsContainer user={user!} setUser={setUser} />
          </>
        )}
      </div>
    </Layout>
  );
}
