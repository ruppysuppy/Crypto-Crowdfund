import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';

import { mount } from 'auth/Auth';

const AuthApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (ref.current) {
      mount(ref.current, {
        onNavigate: ({ pathname: nextPathname }) => {
          if (nextPathname !== history.location.pathname) {
            history.push(nextPathname);
          }
        },
        initialPath: history.location.pathname,
      });
    }
  }, []);

  return <div ref={ref} />;
};

export default AuthApp;
