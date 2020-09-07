import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() {
  }

  encrypt(textToConvert: string): string {
    return CryptoJS.AES.encrypt(textToConvert,
      CryptoJS.enc.Utf8.parse(sessionStorage.getItem('key')),
      { iv: CryptoJS.enc.Utf8.parse(sessionStorage.getItem('iv'))}).toString();
  }

  decrypt(textToConvert: string): string {
    return CryptoJS.AES.decrypt(textToConvert,
    CryptoJS.enc.Utf8.parse(sessionStorage.getItem('key')),
      { iv: CryptoJS.enc.Utf8.parse(sessionStorage.getItem('iv'))}).toString();
  }

  hex2a(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }
}
