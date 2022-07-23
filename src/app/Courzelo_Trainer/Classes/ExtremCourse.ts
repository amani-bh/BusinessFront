import { KolbPhase } from '../Classes/KolbPhase';
export class ExtremCourse {
  name!: string;
  phases!: KolbPhase[];
  quizzId!: string;
  constructor(name: string, phases: KolbPhase[], quizzId: string) {
    this.name = name;
    this.phases = phases;
    this.quizzId = quizzId;
  }
}
