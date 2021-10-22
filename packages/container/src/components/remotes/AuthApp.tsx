import React, { useEffect, useRef } from 'react';

import { mount } from 'auth/Auth';

const AuthApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      mount(ref.current);
    }
  }, []);

  return <div ref={ref} />;
};

export default AuthApp;
