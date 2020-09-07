
export class Credentials {
  login: string;
  password: string;
  token?: string;
  timestamp?: number;

  constructor(username: any, password: any, token, timestamp) {
    this.login = username;
    this.password = password;
    this.token = token;
    this.timestamp = timestamp;
  }
}
