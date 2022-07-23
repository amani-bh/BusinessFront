import { Component, OnInit, ViewChild } from '@angular/core';
import { Formation } from '../../Shared/entities/Formation';
import { FormationService } from '../../Shared/services/formation.service';
import { BreakpointObserver } from '@angular/cdk/layout';

import { ThemePalette } from '@angular/material/core';
import { Post } from '../../Shared/entities/Post';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from '../../Shared/services/post.service';
import { ModalUpdatePostComponent } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Module/modal-update-post/modal-update-post.component';
import { Comment } from '../../Shared/entities/Comment';
import { CommentService } from '../../Shared/services/comment.service';
import { SectionService } from '../../Shared/services/section.service';
import { PhaseService } from '../../Shared/services/phase.service';
import { Phase } from '../../Shared/entities/Phase';
import { ModalTextComponent } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Module/modal-text/modal-text.component';
import { ModalPhaseComponent } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Module/modal-phase/modal-phase.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Section } from '../../Shared/entities/Section';
import { User } from '../../Shared/entities/User';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';

export interface Section1 {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-myclasses',
  templateUrl: './myclasses.component.html',
  styleUrls: ['./myclasses.component.css']
})
export class MyclassesComponent implements OnInit {
  post =new Post()
  posts!:Post[]
  test11!:any
  selectedFile!:File
  privateEtat!:any
  comment!:any
  important!:any
  v!:any
  user!:any
  retrievedImage: any;
  test=false
  base64Data:any; 
  commentA =new Comment()
  comments!:Comment[]
  test1!:any
  valueTest!:any
  color: ThemePalette = 'accent';
    checked = false;
    disabled = false;

    file = new File(["images"], "images.png", {
      type: "image/png",
    });


    folders: Section1[] = [
      {
        name: 'Mohamed Amine Mohsni',
        updated: new Date('1/1/16'),
      },
      
    ];
    notes: Section1[] = [
      {
        name: 'Bilel Merhben',
        updated: new Date('2/20/16'),
      },
      {
        name: 'Asma Chebbi',
        updated: new Date('1/18/16'),
      },
    ];
  
    
     


  constructor(private formationService :FormationService,
    private postService:PostService,
    private userService:FormationService,
    private diag: MatDialog, 
    private commentService:CommentService,
    private observer: BreakpointObserver, 
    private sectionService:SectionService,
    private phaseService:PhaseService,
    private router:ActivatedRoute,
    private tokenService: TokenStorageService) { }
 
  formation!:Formation[]
  formationDetail!:Formation
  section=new Section()
  step = 0;
  currentuser:any;
  sections!:Section[]
   phases!:Phase[]
   phase!:Phase[]
   users!:User[]
   idpath:any;
teacher:User = new User();




  ngOnInit(): void {
    this.v="primary"
    this.idpath = this.router.snapshot.paramMap.get('id');
    this.formationService.getListUserParticipant(this.idpath).subscribe(res=>{
      this.users=res
      console.log(this.users)
      })
      this.formationService.getFormationsById(this.idpath).subscribe((res:any)=>{
        console.log(res)
        this.formationService.getUserById(res.idUserr).subscribe(
         (res:any) => {this.teacher = res;
         console.log(res)}
        )
      })
    this.v="primary"
    
    this.postService.getPostsprivate(this.idpath).subscribe(res=>{
this.posts=res
          this.retrievedImage = 'data:image/jpeg;base64,';
    
    })

    
    this.sectionService.getSectionByIdFormation(this.idpath).subscribe(res=>{
      this.sections=res
      console.log(this.sections)
      this.sections.forEach(element => {
        this.phaseService.getPhaseByIdSection(element.idSection).subscribe(resA=>{
this.phases=resA


  



})
        
      });
     
    
    })
  }
  public onFileChanged(event:any) {
    //Select File
    this.valueTest=true
    this.selectedFile = event.target.files[0];
    
  }
  public onFileChanged2(event:any) {
    //Select File
    this.valueTest=false
    this.selectedFile = event.target.files[0];
    
  }
  onValChange(value:any){
    this.privateEtat=value.checked 
}
onValChange1(value:any){
  this.comment=value.checked 
}
onValChange3(value:any){
  this.important=value.checked 
}

  addPost(){
    this.currentuser = this.tokenService.getUser();
    const uploadImageData = new FormData();
    this.post.stateprivate=this.privateEtat
    this.post.comment=this.comment
    this.post.important=this.important
    this.post.test=this.valueTest
    const user=this.post;
    
    if(this.selectedFile==null){
    uploadImageData.append('imageFile',this.file );}
    else {
      uploadImageData.append('imageFile',this.selectedFile );
    }
    uploadImageData.append('user',JSON.stringify(user));
   
    this.postService.addPosts(this.currentuser.id,this.idpath,uploadImageData).subscribe(res=>{
    
window.location.reload()
    })

  }

  deletePost(id:any){
    this.postService.deletePostById(id).subscribe(res=>{
      window.location.reload()
    })
  }
  
  AddPostDialog(id:any) {
  localStorage.setItem("idPost",id);
    const diagref = this.diag.open(ModalUpdatePostComponent, {
      width: '700px',
      height: '600px',
      
     
      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.ngOnInit
    }));;
   
    
  }
  uploadFile(){
    this.test=!this.test
  }
  uploadFile1(){
    this.test11=!this.test11
  }

getComment(id:any){
 
  this.commentService.getCommentsByIdPost(id).subscribe(res=>{
    this.comments=res
    this.getComment(id)
    this.userService.getUserById(3).subscribe(res=>{
      this.user=res
    })
  })
}

  addComment(id:any)
  {
    this.commentService.addComments(3,id,this.commentA).subscribe(res=>{
    })
  }





  setStep(index: number) {
    this.step = index;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }


  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }




  addSection(){
    let id=localStorage.getItem("idFormation1")
    this.sectionService.addSection(id,this.section).subscribe(res=>{
      window.location.reload()
    })
  }

  AddphaseDialog(id:any) {
    localStorage.setItem("idSection",id)
    const diagref = this.diag.open(ModalPhaseComponent, {
      width: '700px',
      height: '500px',


      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.ngOnInit
    }));;


  }

  AddtextDialog(id:any) {
    localStorage.setItem("idSection",id)
    const diagref = this.diag.open(ModalTextComponent, {
      width: '700px',
      height: '350px',


      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.ngOnInit
    }));;
   

  }

  changeEditing(){
    this.test=!this.test
  }
  updateName(id:any){
this.sectionService.UpdateSection(id,this.section).subscribe(res=>{
})
    
  }
}

