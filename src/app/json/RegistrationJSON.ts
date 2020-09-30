export class RegistrationJSON {
  lat?: number;
  lng?: number;
  approved?: boolean;
  phoneNumber: string;
  walkTimestamp: number;

  constructor(phoneNumber: string, latitude: number, longitude: number, date: Date, approved?: boolean){
    this.phoneNumber = phoneNumber;
    this.lat = latitude;
    this.lng = longitude;
    this.walkTimestamp = date.getTime() / 1000 - 0;
    this.approved = approved;
  }
}
