import { Course } from "./course";
import { User } from "./user";

export interface Cart {
    id: number;
    user: User;
    course: Course;
    state: boolean | any;
  }