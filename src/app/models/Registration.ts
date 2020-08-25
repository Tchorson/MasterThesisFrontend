export class Registration{
  number: string;
  latitude?: number;
  date: Date;
  longitude?: number;
  status?: boolean;

  constructor(phoneNumber: string, latitude: number, longitude: number, date: number, approved?: boolean){
      this.number = phoneNumber;
      this.latitude = latitude;
      this.longitude = longitude;
      this.date = new Date(date * 1000);
      this.status = approved;
  }
}
