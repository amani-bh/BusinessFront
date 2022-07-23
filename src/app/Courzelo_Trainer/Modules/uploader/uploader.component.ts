import { Component } from '@angular/core';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {

  isHovering!: boolean;

  files:File[]=[];

  onSelect(event: { addedFiles: any; }) {
    console.log(event.addedFiles);
    let type:any = event.addedFiles[0].name.split('.');
    type = type[type.length - 1];
    console.log(type);

        this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
