declare module 'auth/Auth' {
  function mount(
    element: HTMLElement,
    options: import('../../interfaces/authApp').IAuthMountOptions,
  ): void;
}
