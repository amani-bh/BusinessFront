import { KolbPhase } from '../Classes/KolbPhase';
export class IntrConcluExtremCourse {
  name!: string;
  phases!: KolbPhase[];
  constructor(name: string, phases: KolbPhase[]) {
    this.name = name;
    this.phases = phases;
  }
}
