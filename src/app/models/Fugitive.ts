export class Fugitive{
  User: string;
  Missing_Date: Date;
  Latitude?: number;
  Longitude?: number;


  constructor(User: string, Missing_Date: Date, Latitude: number, Longitude: number) {
    this.User = User;
    this.Missing_Date = Missing_Date;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
  }
}
