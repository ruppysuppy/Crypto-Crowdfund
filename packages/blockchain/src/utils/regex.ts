const urlImageRegex =
  /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg|bmp|ico|tiff|tif))/gi;
// const altUrlImageRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;

const checkUrlImage = (text: string) => {
  return urlImageRegex.test(text);
};

export { checkUrlImage };
