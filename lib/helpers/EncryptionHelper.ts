import CryptoJS from 'crypto-js';

export const encryptData = (data: any) => {
    const key = process.env.REACT_APP_CRYPTO_KEY || 'v0tRdmRAY4pS/UEu2KKFsCtspKP4dfpHouUwDQLTmT9DyKxcYPrm3MmocPDiNHn4';
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    return encrypted;
}

export const decryptData = (data: any) => {
    const key = process.env.REACT_APP_CRYPTO_KEY || 'v0tRdmRAY4pS/UEu2KKFsCtspKP4dfpHouUwDQLTmT9DyKxcYPrm3MmocPDiNHn4';
    const decrypted = CryptoJS.AES.decrypt(data, key);
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}