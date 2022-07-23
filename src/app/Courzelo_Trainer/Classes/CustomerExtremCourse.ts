import {CustomerPhase} from '../Classes/CustomerPhase';
export class CustomerExtremCourse {
  name!:string;
  phases!:CustomerPhase[];
  constructor(name:string,phases:CustomerPhase[]) {
    this.name=name;
    this.phases=phases;
  }
}
