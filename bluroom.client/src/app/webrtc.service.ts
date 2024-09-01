import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  private localStream: MediaStream | undefined;

  public async startLocalStream(videoElement: HTMLVideoElement): Promise<void> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      videoElement.srcObject = this.localStream;
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  }
}
