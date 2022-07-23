

export class Project
   
{ id!:string;
  title!:string;
  description!:string;
  names:string[]=[];
  types:string[]=[];
  downloadurl:string[]=[];
 
  correctionsList:correctionsList[]=[];
 

}

export class correctionsList{

  idtrainee!:number | any;
  names:string[]=[];
  types:string[]=[];
  downloadurl:string[]=[];

  
  }

