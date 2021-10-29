declare module 'auth/Auth' {
  function mount(
    element: HTMLElement,
    options: import('../../interfaces/authApp').IAuthMountOptions,
  ): {
    onParentNavigate: (props: { pathname: string }) => void;
  };
}

declare module 'marketing/Marketing' {
  function mount(
    element: HTMLElement,
    options: import('../../interfaces/marketingApp').IMarketingMountOptions,
  ): {
    onParentNavigate: (props: { pathname: string }) => void;
  };
}
