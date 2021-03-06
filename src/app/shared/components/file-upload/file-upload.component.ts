import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  @Input() files: any[] = [];
  @Output() sendFiles: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

   /**
   * on file drop handler
   */
    onFileDropped($event) {
      this.prepareFilesList($event);
    }
  
    /**
     * handle file from browsing
     */
    fileBrowseHandler(files) {
      this.prepareFilesList(files);
    }
  
    /**
     * Delete file from files list
     * @param index (File index)
     */
    deleteFile(index: number) {
      console.log('delete image', this.files[index].progress);
      
      if (this.files[index].progress < 100) {
        console.log("Upload in progress.");
        return;
      }
      this.files.splice(index, 1);
      this.sendFiles.emit(this.files);
    }

      /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 10;
          }
        }, 200);
      }
    }, 1000);
  }

   /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
    prepareFilesList(files: Array<any>) {
      for (const item of files) {
        const newFile = {
          progress: 0,
          id: '',
          url: '',
          file: item,
        }
        this.files.push(newFile);
      }
      this.fileDropEl.nativeElement.value = "";
      this.uploadFilesSimulator(0);

      this.sendFiles.emit(this.files);
    }

     /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      //return "0 Bytes";
      return "Tama??o desconocido";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

}
