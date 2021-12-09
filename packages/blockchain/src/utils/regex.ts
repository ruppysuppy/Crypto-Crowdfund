const urlImageRegex =
  /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg|bmp|ico|tiff|tif))/gi;

const checkUrlImage = (text: string) => {
  return urlImageRegex.test(text);
};

export { checkUrlImage };
