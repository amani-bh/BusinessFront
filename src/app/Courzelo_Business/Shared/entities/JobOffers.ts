import { Quiz } from "src/app/Courzelo_Quizz/Shared/entities/Quiz";
import { CandidateApp } from "./CandidateApp";

export class JobOffers {
idJob:any;
title:string;
description:string;
creationDate:Date;
startDate:Date;
deadlineDate:Date;
industry:String;
subIndustry:String;
schedulesType:String;
state:string;
jobType:string;
location:string;
country:string;
locationType:string;
requirement:Array<String>;
hireNumber:number;
salary:number;
salaryOption:String;
salaryRangeMax:number;
salaryRangeMin:number;
salaryStartAmout:number;
salaryCurrency:String;
jobBenefits:String;
communication:boolean;
communicationMails:Array<string>;
idPrehiringTest:string
business:any;
idTest:string[];
totalApp:number;
newApp:number;
    
    

constructor(
    idJob:any,
    title:string,
    description:string,
    creationDate:Date,
    deadlineDate:Date,
    startDate:Date,
    industry:String,
    subIndustry:String,
    schedulesType:String,
    state:string,
    jobType:string,            
    location:string,
    country:string,
    locationType:string,
    requirement:Array<String>,
    hireNumber:number,
    salaryOption:String,
    salary:number,
    salaryRangeMax:number,
    salaryRangeMin:number,
    salaryStartAmout:number,
    salaryCurrency:String,
    jobBenefits:String,
    communication:boolean,
    communicationMails:Array<string>,
    idPrehiringTest:string,
    business:any,
    totalApp:number,
    newApp:number,
    idTest:string[])
    {
        this.idJob=idJob;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.deadlineDate = deadlineDate;
        this.startDate = startDate;
        this.state = state;
        this.industry = industry;
        this.subIndustry=subIndustry;
        this.schedulesType = schedulesType;
        this.jobType = jobType;
        this.location = location;
        this.country=country
        this.locationType = locationType;
        this.requirement = requirement;
        this.hireNumber = hireNumber;
        this.salaryOption=salaryOption
        this.salary = salary;
        this.salaryRangeMax = salaryRangeMax;
        this.salaryRangeMin = salaryRangeMin;
        this.salaryStartAmout = salaryStartAmout;
        this.salaryCurrency = salaryCurrency;
        this.jobBenefits = jobBenefits;
        this.communication = communication;
        this.communicationMails = communicationMails;
    
        this.idPrehiringTest=idPrehiringTest
        this.business=business
        this.totalApp=totalApp;
        this.newApp=newApp;
        this.idTest=idTest;
    

}


}


