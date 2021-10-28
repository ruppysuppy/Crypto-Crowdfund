import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';

import { mount } from 'auth/Auth';
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
          SIGN_IN: routes.SIGN_IN,
          SIGN_UP: routes.SIGN_UP,
          FAQ: routes.FAQ,
        },
      });

      history.listen(onParentNavigate);
    }
  }, []);

  return <div ref={ref} />;
};

export default AuthApp;
