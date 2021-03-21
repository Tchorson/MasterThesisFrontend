export class SuspiciousJSON{
  user: string;
  deltaAtPlace: number;
  deltaBetweenMeetings: number;
  hierarchyLevel: number;
  riskLevel?: string;

  constructor(phoneNumber: string, deltaPlace: number, deltaMeetings: number, hierarchy: number, risk?: string){
    this.user = phoneNumber;
    this.deltaAtPlace = deltaPlace;
    this.deltaBetweenMeetings = deltaMeetings;
    this.hierarchyLevel = hierarchy;
    this.riskLevel = risk;
  }
}
