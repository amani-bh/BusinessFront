import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Project } from '../../Shared/entities/Project';
import { ProjectService } from '../../Shared/services/project.service';

@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.css']
})
export class UpdateprojectComponent implements OnInit {

  idproject!: string;
  project: Project = new Project();
  files:File[]=[];
  filesurl:string[]=[];
  filename:string[]=[];
  filestypes:string[]=[];
  verif:number=0;
  fbuilder: FormBuilder = new FormBuilder();
  projectform!: FormGroup;
  currentuser: any;
  constructor(private ar: ActivatedRoute, private projectservice: ProjectService,private _router: Router) { }

  ngOnInit(): void {
   
    this.ar.paramMap.subscribe(params => {
      this.idproject = String(params.get('id'));
    });
    this.projectservice.getprojectbyid(this.idproject).subscribe(res => {this.project = res; this.setfield()
     });

     this.projectform = this.fbuilder.group({
      title: ['', ],
      description: ['', ],
    
    
    })
    
    

  }
  setfield(){
    this.projectform.get("title")?.setValue(this.project.title);
    this.projectform.get("description")?.setValue(this.project.description);
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
    
       if(this.files[i].name==event.addedFiles[0].name)
        {this.verif++;
          if(this.verif>0)
          {break;}
          }
          
       }
    
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
 

 

  onRemoveold(index:number) {

this.project.names.splice(index,1)
this.project.types.splice(index,1)
this.project.downloadurl.splice(index,1)

   
   
  }
  onRemovenew(index:number) {

 
    
        this.files.splice(index, 1);
        this.filesurl.splice(index, 1);
        this.filename.splice(index, 1);
        this.filestypes.splice(index, 1)
       
      }

  update(){
    this.project.title=this.projectform.value.title
    this.project.description=this.projectform.value.description
    for(let i=0;i<=this.filename.length-1;i++)
    {this.project.names.push(this.filename[i])
      this.project.types.push(this.filestypes[i])
      this.project.downloadurl.push(this.filesurl[i])}

 this.projectservice.updateproject(this.idproject,this.project).subscribe(res=>   Swal.fire({
  title: 'project updated!',
  icon: 'success',
  confirmButtonColor: '#07294d',
}))
    
this._router.navigateByUrl("quizzSpace")
   // this.quizservice.addproject(this.projet).subscribe()
      }
}
