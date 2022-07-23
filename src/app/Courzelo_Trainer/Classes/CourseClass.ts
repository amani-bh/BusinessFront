import { CustomerExtremCourse } from './CustomerExtremCourse';
import { ExtremCourse } from './ExtremCourse';

export class Course {
  idUser!: number;
  title!: string;
  language!: string;
  category!: string;
  outcomes!: string[];
  description!: string;
  details!: string;
  skillsRequired!: string[];
  introduction!: {};
  sections!: ExtremCourse[];
  customerSections!: CustomerExtremCourse[];
  conclusion!: {};
  audience!: string;
  preRequisites!: string[];
  instructorInfo!: string;
  courseImage!: string;
  courseVideo!: string;
  price!: number;
  progress!: number;
  status!: string;
  globalQuizzId!: string;
  score!: number;
  constructor(
    idUser: number,
    title: string,
    language: string,
    category: string,
    outcomes: string[],
    description: string,
    details: string,
    skillsRequired: [],
    introduction: {},
    sections: ExtremCourse[],
    customerSections: CustomerExtremCourse[],
    conclusion: {},
    audience: string,
    preRequisites: string[],
    instructorInfo: string,
    courseImage: string,
    courseVideo: string,
    price: number,
    progress: number,
    status: string,
    globalQuizzId: string,
    score: number
  ) {
    this.idUser = idUser;
    this.title = title;
    this.language = language;
    this.category = category;
    this.description = description;
    this.outcomes = outcomes;
    this.details = details;
    this.skillsRequired = skillsRequired;
    this.introduction = introduction;
    this.sections = sections;
    this.customerSections = customerSections;
    this.conclusion = conclusion;
    this.audience = audience;
    this.preRequisites = preRequisites;
    this.instructorInfo = instructorInfo;
    this.courseImage = courseImage;
    this.courseVideo = courseVideo;
    this.price = price;
    this.progress = progress;
    this.status = status;
    this.globalQuizzId = globalQuizzId;
    this.score = score;
  }
}
