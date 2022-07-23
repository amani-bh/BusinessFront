export class PrehiringTests{
    idPrehiringTest:any;
    title:string;
    creationDate:Date;
    intro:String;
    openDate:Date;
    randomOrder:boolean
    questions:Array<Question>;

    constructor(idPrehiringTest:any,
        title:string,
        creationDate:Date,
        openDate:Date,
        randomOrder:boolean,
        intro:String,
        questions:Array<Question>){
        this.idPrehiringTest=idPrehiringTest;
        this.title= title;
        this.creationDate=creationDate;
        this.questions=questions;
        this.intro=intro;
        this.openDate=openDate,
        this.randomOrder=randomOrder


    }
}

export class Question{
    questionId:number;
    questionLabel:string;
    falseResponses:Array<string>;
    correctResponses:Array<string>;
    score:number;
    time:number;
    typeQ:string
    

    constructor( 
        questionId:number,
        questionLabel:string,
        falseResponses:Array<string>,
        correctResponses:Array<string>,
        score:number,typeQ:string,
        
        time:number){
            this.questionId=questionId;
            this.questionLabel=questionLabel;
            this.correctResponses=correctResponses;
            this.falseResponses=falseResponses;
            this.score=score;
            this.time=time;
            this.typeQ=typeQ
            

    }
}