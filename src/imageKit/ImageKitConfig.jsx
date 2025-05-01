import ImageKit from "imagekit";

const imageKitConfig = new ImageKit({
    publicKey: import.meta.env.VITE_APP_IMAGEKIT_PUBLIC_KEY,
    privateKey: import.meta.env.VITE_APP_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: import.meta.env.VITE_APP_IMAGEKIT_URLENDPOINT,
    authenticationEndpoint: import.meta.env.VITE_APP_IMAGEKIT_AUTHENTICATIONENDPOINT,
});

export { imageKitConfig };