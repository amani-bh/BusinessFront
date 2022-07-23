import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import Swal from 'sweetalert2';
import { Project } from '../../Shared/entities/Project';
import { ProjectService } from '../../Shared/services/project.service';

@Component({
  selector: 'app-showproject',
  templateUrl: './showproject.component.html',
  styleUrls: ['./showproject.component.css']
})
export class ShowprojectComponent implements OnInit {

  idproject!: string;
  project: Project = new Project();
  files:File[]=[];
  filesurl:string[]=[];
  filename:string[]=[];
  filestypes:string[]=[];
  verif:number=0;
  fbuilder: FormBuilder = new FormBuilder();
  projectanswerform!: FormGroup;
  currentuser: any;
  constructor(private ar: ActivatedRoute, private projectservice: ProjectService,private tokenService: TokenStorageService,) { }

  ngOnInit(): void {
    this.currentuser = this.tokenService.getUser();
    this.ar.paramMap.subscribe(params => {
      this.idproject = String(params.get('id'));
    });
    this.projectservice.getprojectbyid(this.idproject).subscribe(res => {this.project = res});
    this.projectanswerform = this.fbuilder.group({
     
      ressources: ['', [Validators.required]],
    
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
 

 

  onRemove(index:number) {
    this.files.splice(index, 1);
    this.filesurl.splice(index, 1);
    this.filename.splice(index, 1);
    this.filestypes.splice(index, 1)
   
  }

  add(){
    
 
   this.project.correctionsList.push({
      idtrainee:this.currentuser.id,
      names:this.filename,
    types:this.filestypes,
  downloadurl:this.filesurl})
 this.projectservice.updateproject(this.idproject,this.project).subscribe(res=>   Swal.fire({
  title: 'files added!',
  icon: 'success',
  confirmButtonColor: '#07294d',
}))
    

   // this.quizservice.addproject(this.projet).subscribe()
      }

}
