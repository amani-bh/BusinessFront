export class TechTest{
    idTest:any
    idQuiz:string
    business:any
    DateCreation:Date

    constructor(idTest:any,
        idQuiz:string,
        business:any,
        DateCreation:Date){
  this.business=business;
  this.idQuiz=idQuiz;
  this.DateCreation=DateCreation;
  this.idTest=idTest
    }
}