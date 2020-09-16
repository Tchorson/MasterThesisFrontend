export class Data{
  User: string;
  Device: string;
  Date: Date;

  constructor(phoneNumber: string, location: string, date: Date) {
    this.User = phoneNumber;
    this.Device = location;
    this.Date = date;
  }
}
