

export class Quiz
   
{ id!:string;
  title!:string;
  description!:string;
   creationdate!:Date;

 limitdate!:Date;
 nbquestions!:number;
 type!:string;
 final_score!:number;
 typecountdown!:string;
 countperquiz!:number;
 evaluationmodel!:string;
 correct!:string;
 wrong!:string;
 questionsList:questionsList[]=[];
 correctionsList:correctionsList[]=[];
 

}


export class questionsList{

question!:string;
points!:number;
timerperquestion!:number;
correctanswer:string[]=[];
wronganswer:string[]=[];


}

export class correctionsList{

  idtrainee!:number | any;
  score!:number;

  
  }

