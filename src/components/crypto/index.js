
import cryptoJS from 'crypto-js';

const cryptoKey = process.env.REACT_APP_CRYPTO_KEY;

const Encrypt = (data) => {
    return cryptoJS.AES.encrypt(JSON.stringify(data), cryptoKey).toString();
}

const Decrypt = (data) => {
    const bytes = cryptoJS.AES.decrypt(data, cryptoKey);
    return JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
}

export { Encrypt, Decrypt };