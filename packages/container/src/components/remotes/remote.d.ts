declare module 'auth/Auth' {
  function mount(
    element: HTMLElement,
    options: import('../../interfaces/authApp').IAuthMountOptions,
  ): {
    onParentNavigate: (props: { pathname: string }) => void;
  };
}
