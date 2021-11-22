import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import Layout from '../../hoc/Layout';
import Loader from '../../ui/Loader/Loader';
import { IRoutes } from '../../../interfaces/routes';
import useQuery from '../../../hooks/useQuery';
import { IUser } from '../../../interfaces/user';
import { getFirebaseApp } from '../../../shared/firebase';
import AccountDetailsContainer from './AccountDetailsContainer/AccountDetailsContainer';

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
  const auth = getAuth(firebaseApp);
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
        const userData = {
          ...(userDoc.data() as IUser),
          uid: userDoc.id,
        };
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
          <Loader />
        ) : (
          <>
            <AccountDetailsContainer user={user!} />
          </>
        )}
      </div>
    </Layout>
  );
}
