import { Course } from "./course";
import { User } from "./user";

export interface Mylearning {
    idMyLearning: number;
    user: User;
    courses: Course[];
}