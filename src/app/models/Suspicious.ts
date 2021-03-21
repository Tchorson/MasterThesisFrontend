export class Suspicious{
  number: string;
  deltaPlace: number;
  deltaMeetings: number;
  hierarchy: number;
  risk?: string;

  constructor(phoneNumber: string, deltaPlace: number, deltaMeetings: number, hierarchy: number, risk?: string){
    this.number = phoneNumber;
    this.deltaPlace = deltaPlace;
    this.deltaMeetings = deltaMeetings;
    this.hierarchy = hierarchy;
    this.risk = risk;
  }
}
