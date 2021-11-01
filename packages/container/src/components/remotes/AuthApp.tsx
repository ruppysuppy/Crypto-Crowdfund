import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';

import { mount } from 'auth/Auth';
import routes from '../../shared/routes';
import { firebaseConfig } from '../../shared/firebase';
import { IUser } from '../../interfaces/user';

interface IProps {
  setUser: (user: IUser | null) => void;
}

const AuthApp = ({ setUser }: IProps) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (ref.current) {
      const { onParentNavigate } = mount(ref.current, {
        firebaseConfig: firebaseConfig,
        initialPath: history.location.pathname,
        routes: routes,
        onAuthStateChangedHandler: setUser,
        onNavigate: ({ pathname: nextPathname }) => {
          if (nextPathname !== history.location.pathname) {
            history.push(nextPathname);
          }
        },
      });

      history.listen(onParentNavigate);
    }
  }, []);

  return <div ref={ref} />;
};

export default AuthApp;
