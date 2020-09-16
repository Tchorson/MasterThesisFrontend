export class DataJSON{
  phoneNumber: string;
  location: string;
  date: number;

  constructor(phoneNumber: string, location: string, date: number) {
    this.phoneNumber = phoneNumber;
    this.location = location;
    this.date = date;
  }
}
