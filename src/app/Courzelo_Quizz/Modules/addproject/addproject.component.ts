import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Project } from '../../Shared/entities/Project';
import { ProjectService } from '../../Shared/services/project.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  projet: Project = new Project();
  isHovering!: boolean;
  projectform!: FormGroup;
  fbuilder: FormBuilder = new FormBuilder();

  files:File[]=[];
filesurl:string[]=[];
filename:string[]=[];
filestypes:string[]=[];

verif:number=0;
keepgoing:boolean=true
constructor(private projectservice: ProjectService) {  }
ngOnInit() {
  this.projectform = this.fbuilder.group({
    title: ['', ],
    description: ['', ],
  
  
  })
 
}

  onSelect(event: { addedFiles: any; }) {
  
    let type:any = event.addedFiles[0].name.split('.');
    type = type[type.length - 1];


    if(this.files.length==0)
    {
      this.files.push(...event.addedFiles)
      this.filename.push(event.addedFiles[0].name)
    this.filestypes.push(event.addedFiles[0].type)}
      else if(this.files.length==1)
      {
         if(this.files[0].name!=event.addedFiles[0].name)
        {this.files.push(...event.addedFiles)
        this.filename.push(event.addedFiles[0].name)
        this.filestypes.push(event.addedFiles[0].type)}
        else{ Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'File already uploaded',
          
        })}

      }

    else if(this.files.length>1 ){ //condition pour file ayant le meme nom
     
      for (let i = 0; i <= this.files.length-1; i++) {
      //  console.log(this.files[i].name)
       if(this.files[i].name==event.addedFiles[0].name)
        {this.verif++;
          if(this.verif>0)
          {break;}
          }
          
       }
       console.log(this.verif)
       if(this.verif==0){this.files.push(...event.addedFiles)
        this.filename.push(event.addedFiles[0].name)
        this.filestypes.push(event.addedFiles[0].type)}
        else if(this.verif>0){Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'File already uploaded',
          
        })}
       this.verif=0;
  
    }

        
    
  }
 

 

  onRemove(index:number) {
    this.files.splice(index, 1);
  
    this.filesurl.splice(index, 1);
    this.filename.splice(index, 1);
    this.filestypes.splice(index, 1)

  }

  add(){
    
this.projet.title=this.projectform.value.title
this.projet.description=this.projectform.value.description

this.projet.names=this.filename;
this.projet.downloadurl=this.filesurl
this.projet.types=this.filestypes


this.projectservice.addproject(this.projet).subscribe(res=>Swal.fire({
  title: 'project aded!',
  icon: 'success',
  confirmButtonColor: '#07294d',
}))
  }
}
