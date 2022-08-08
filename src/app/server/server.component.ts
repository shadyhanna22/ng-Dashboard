import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServerMessage } from '../shared/server-message';
import { Server } from "../shared/server";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  serverStatus: string;
  isLoading: boolean;
  color: string;
  buttonText: string;

  constructor() { }


  @Input() serverInput : Server;
  @Output() serverAction = new EventEmitter<ServerMessage>();

  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline);
  }

  setServerStatus(isOnline: boolean){
    if (isOnline) {
      this.serverInput.isOnline = true;
      this.serverStatus = 'Online';
      this.color = '#66BB6A';
      this.buttonText = 'Shut Down';
    } else {
      this.serverInput.isOnline = false;
      this.serverStatus = 'Offline';
      this.color = '#ff6b6b';
      this.buttonText = 'Start';
    }
  }

  makeLoading() {
    this.color = '#ffca28';
    this.buttonText = 'Pending...';
    this.isLoading = true;
    this.serverStatus = 'Loading';
  }

  sendServerAction(isOnline: boolean){
    console.log('serverAction!')
    this.makeLoading();
    const payload = this.builPayload(isOnline);
    this.serverAction.emit(payload);
  }
  
  builPayload(isOnline: boolean): ServerMessage {
    if (isOnline){
      return {
        id: this.serverInput.id,
        payload: 'deactivate'
      } 
    }else {
      return {
        id: this.serverInput.id,
        payload: 'activate'
      }
    }
  }
}
