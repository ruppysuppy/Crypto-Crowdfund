declare module '*.module.css' {
  const styles: {
    [className: string]: string;
  };
  export = styles;
}
