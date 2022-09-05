export class OtherTest{
    idOtherTest:any;
    title:string;
    creationDate:Date;
    intro:String;
    openDate:Date;
    randomOrder:boolean
    category:String
    questions:Array<QuestionsOtherTest>
    imagesQuestions:Array<QuestionsOtherTest>;

    constructor(idOtherTest:any,
        title:string,
        creationDate:Date,
        openDate:Date,
        randomOrder:boolean,
        intro:String,
        questions:Array<QuestionsOtherTest>,
        category:String,
        imagesQuestions:Array<QuestionsOtherTest>){
        this.idOtherTest=idOtherTest;
        this.title= title;
        this.creationDate=creationDate;
        this.questions=questions;
        this.intro=intro;
        this.openDate=openDate,
        this.randomOrder=randomOrder,
        this.category=category,
       this. imagesQuestions=imagesQuestions


    }
}

export class QuestionsOtherTest{
    questionId:number;
    questionLabel:string;
    falseResponses:Array<string>;
    correctResponses:Array<string>;
    score:number;
    time:number;
    typeQ:string;
    categoryQuestion:string
    

    constructor( 
        questionId:number,
        questionLabel:string,
        falseResponses:Array<string>,
        correctResponses:Array<string>,
        score:number,typeQ:string,
        categoryQuestion:string,
        time:number){
            this.questionId=questionId;
            this.questionLabel=questionLabel;
            this.correctResponses=correctResponses;
            this.falseResponses=falseResponses;
            this.score=score;
            this.time=time;
            this.typeQ=typeQ
            this.categoryQuestion=categoryQuestion
            

    }
}