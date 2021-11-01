import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';

import { mount } from 'marketing/Marketing';
import routes from '../../shared/routes';
import { IUser } from '../../interfaces/user';

interface IProps {
  user: IUser | null;
}

const AuthApp = ({ user }: IProps) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (ref.current) {
      const { onParentNavigate } = mount(ref.current, {
        initialPath: history.location.pathname,
        isAuthenticated: !!user,
        routes: {
          HOME: routes.HOME,
          ABOUT: routes.ABOUT,
          FAQ: routes.FAQ,
          TERMS_AND_CONDITIONS: routes.TERMS_AND_CONDITIONS,
          PRIVACY_POLICY: routes.PRIVACY_POLICY,
          DISCLAIMER: routes.DISCLAIMER,
          CAMPAIGNS: routes.CAMPAIGNS,
          SIGN_IN: routes.SIGN_IN,
        },
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
