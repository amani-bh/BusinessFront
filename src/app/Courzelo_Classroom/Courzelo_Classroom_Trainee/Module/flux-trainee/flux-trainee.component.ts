import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalUpdatePostComponent } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Module/modal-update-post/modal-update-post.component';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { Comment } from '../../Shared/entities/Comment';
import { FileUpload } from '../../Shared/entities/file';
import { Post } from '../../Shared/entities/Post';
import { User } from '../../Shared/entities/User';
import { CommentService } from '../../Shared/services/comment.service';
import { FileUploadService } from '../../Shared/services/file-upload.service';
import { FormationService } from '../../Shared/services/formation.service';
import { PostService } from '../../Shared/services/post.service';

@Component({
  selector: 'app-flux-trainee',
  templateUrl: './flux-trainee.component.html',
  styleUrls: ['./flux-trainee.component.css']
})
export class FluxTraineeComponent implements OnInit {
  post =new Post()
  posts!:Post[]
  test11!:any
  selectedFile!:File
  privateEtat!:any
  comment!:any
  important!:any
  v!:any
  imagetest!:boolean
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
    currentuser: User | any;
  index:any;
  
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  
  
  file = new File(["images"], "images.png", {
    type: "image/png",
  });
   id =localStorage.getItem("idFormation1")
    constructor(private postService:PostService,
      private userService:FormationService,
      private diag: MatDialog, 
      private commentService:CommentService,
      private tokenService:TokenStorageService,
      private uploadService: FileUploadService,
      private storage: AngularFireStorage
      ) { }
  
    ngOnInit(): void {
  this.currentuser = this.tokenService.getUser();
      this.v="primary"
      console.log(this.posts)
      this.getpostbyid()
      this.getComment
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
      selectFile(event: any): void {
        this.selectedFiles = event.target.files;
      }
      upload(): void {
        if (this.selectedFiles) {
          const file: File | null = this.selectedFiles.item(0);
          //this.selectedFiles = undefined;
          if (file) {
            this.currentFileUpload = new FileUpload(file);
            this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
              (percentage:any) => {
                this.percentage = Math.round(percentage ? percentage : 0);
              },
              error => {
                console.log(error);
              }
            );
          }
        }
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
     
      const uploadImageData = new FormData();
      this.post.stateprivate=this.privateEtat
      this.post.comment=this.comment
      this.post.important=this.important
      this.post.test=this.valueTest
      
      
  
      if(this.selectedFiles==null){
        
        // uploadImageData.append('imageFile',this.file );
         this.post.typefile = null;
         
         }
         else {
           const filePath = `${this.uploadService.basePath}/${this.currentFileUpload?.file.name}`;
         const storageRef = this.storage.ref(filePath);
          // uploadImageData.append('imageFile',this.selectedFile );
            storageRef.getDownloadURL().subscribe(d => {this.post.typefile = d;
             const user=this.post;
         uploadImageData.append('user',JSON.stringify(user));
         
         this.postService.addPosts(this.currentuser.id,this.id,uploadImageData).subscribe(res=>{
          this.getpostbyid()
        })
         
           });
           
         }
  
      
  
    }
    username:String[] = [];
  getpostbyid(){
    this.postService.getPostsByIdFormation(this.id).subscribe((res:Post[])=>{
      this.posts=res
      console.log(this.posts)
      this.posts.forEach(p => {
        this.commentService.getcommentuserById(p.iduser).subscribe((c:any) => {
          this.username.push(c.displayName)
        })
      })
      console.log(this.username)
      
      
      
        
    })
      
      
                /**this.retrievedImage = 'data:image/jpeg;base64,';
          console.log(this.retrievedImage)*/
         
  }
    updatepostpublic(id:any){
      this.postService.updatePostsprivate(id,true).subscribe(res=>{
  
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
  
  getComment(id:any,i:any){
   this.index = i
    this.commentService.getCommentsByIdPost(id).subscribe((res:Comment[])=>{
      this.posts[this.index].comments=res
      
      this.posts[this.index].comments.forEach(c=>{
        this.commentService.getcommentuserById(c.idUser).subscribe(
          (res:User | any) => c.displayName = res.displayName
          
        )
      })
      // this.getComment(id)
     
    })
  }
  
    addComment(id:any,index:any)
    {
  
      this.commentService.addComments(this.currentuser.id,id,this.commentA).subscribe(res=>{
        this.commentA.commentContent =''
      this.getComment(id,index)
      console.log("kkkkkkkkkkkkkkkkkkkkkkk",this.commentA)
  
      })
    }
  
    deleteCommentById(id:any,index:any,idpost:any){
      this.commentService.deleteCommentById(id).subscribe(res=>{
        this.getComment(idpost,index)
      })
    }
  
  
    imageisnull(j:any):boolean{
      if (j != null && (j.includes(".png") || j.includes(".PNG") || j.includes(".jpg"))){
        return true;
      }
      else {return false;}
  }
  videoisnull(j:any):boolean{
    if (j != null && j.includes(".mp4")){
      return true;
    }
    else {return false;}
  }
  pdfisnull(j:any):boolean{
  
  if (j != null && j.includes(".pdf")){ 
    //console.log(file)
    //console.log(j.typefile);
    return true;
  }
  else {return false;}
  }
  }
  