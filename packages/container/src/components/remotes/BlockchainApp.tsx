import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';

import { mount } from 'blockchain/Blockchain';
import routes from '../../shared/routes';
import { firebaseConfig } from '../../shared/firebase';

const BlockchainApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (ref.current) {
      const { onParentNavigate } = mount(ref.current, {
        firebaseConfig: firebaseConfig,
        initialPath: history.location.pathname,
        routes: routes,
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

export default BlockchainApp;
