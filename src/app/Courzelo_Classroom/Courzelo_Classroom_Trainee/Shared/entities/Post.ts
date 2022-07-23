import { User } from "src/app/Courzelo_Core/Modules/Entity/user";
import { Comment } from "./Comment";

export class Post{
    idPost:any
    postContent!:String ;	
 date!:Date;
 title!:String;
 stateprivate!:boolean;
 comment!:boolean;
 important!:boolean;
test!:boolean
iduser!:User;

comments!:Comment[]
typefile!: any;
  }
  