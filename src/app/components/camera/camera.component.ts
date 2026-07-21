import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent  implements OnInit {

  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasElement!: ElementRef<HTMLCanvasElement>;
  
  capturedImage: string | null = null;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async initCamera() {
    try {
      // Request permission for the user's video camera stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      
      // Bind the video stream source to the video element
      this.videoElement.nativeElement.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the camera stream:', error);
    }
  }

  capture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      // Draw the exact frame from the video tag onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Extract the canvas image data as a Base64 string URL
      this.capturedImage = canvas.toDataURL('image/png');
    }
  }

  cameraButton() {
    this.initCamera();
  }

  async closeCamera() {
    let modal = await this.modalController.dismiss({
      component:CameraComponent
    })
  }

}
