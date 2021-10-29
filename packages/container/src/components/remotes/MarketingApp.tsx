import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';

import { mount } from 'marketing/Marketing';
import routes from '../../shared/routes';

const AuthApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (ref.current) {
      const { onParentNavigate } = mount(ref.current, {
        onNavigate: ({ pathname: nextPathname }) => {
          if (nextPathname !== history.location.pathname) {
            history.push(nextPathname);
          }
        },
        initialPath: history.location.pathname,
        routes: {
          HOME: routes.HOME,
          ABOUT: routes.ABOUT,
          FAQ: routes.FAQ,
          TERMS_AND_CONDITIONS: routes.TERMS_AND_CONDITIONS,
          PRIVACY_POLICY: routes.PRIVACY_POLICY,
          DISCLAIMER: routes.DISCLAIMER,
        },
      });

      history.listen(onParentNavigate);
    }
  }, []);

  return <div ref={ref} />;
};

export default AuthApp;
