import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  private localStream: MediaStream | undefined;
  private peerConnection: RTCPeerConnection | undefined;

  public async startLocalStream(videoElement: HTMLVideoElement): Promise<void> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      videoElement.srcObject = this.localStream;
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  }

  public hangUp() {
    this.localStream?.getTracks().forEach(track => track.stop());
    this.peerConnection?.close();
    this.peerConnection = undefined;
  }

  public toggleMute(isMuted: boolean) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => track.enabled = !isMuted);
    }
  }
}
