import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  progress:number=0;
  @Output() newItemEvent = new EventEmitter<any>();
  downloadURL!:any;
  @Input()
  file!: File;
  @Input()
  filesurl!:String[];
state:boolean=false;

  task!: AngularFireUploadTask;
  percentage!: Observable<number|undefined>;
  snapshot!: Observable<any>;


  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit() {
  
    this.startUpload();
   
  }

  startUpload() {

    // The storage path
    const path = `projects/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
   this.percentage = this.task.percentageChanges();

this.state=true;
    this.snapshot   = this.task.snapshotChanges().pipe(
      // tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
this.filesurl.push( this.downloadURL)

       this.newItemEvent.emit( this.downloadURL);
     this.state=false;
        this.db.collection('projects').add( { downloadURL: this.downloadURL, path });
      }),
    );
  }

  isActive(snapshot:any) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
