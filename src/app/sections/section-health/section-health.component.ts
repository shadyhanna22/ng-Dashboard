import { Component, OnInit, OnDestroy } from '@angular/core';
import { concat, Observable, timer } from 'rxjs';
import { ServerService } from '../../services/server.service'
import { Server } from "../../shared/server";
import { concatMap, first } from 'rxjs/operators';
import { ServerMessage } from '../../shared/server-message'

// const SAMPLE_SERVER = [
//     {id: 1, name: "dev-web", isOnline: true},
//     {id: 2, name: "dev-mail", isOnline: false},
//     {id: 3, name: "prod-web", isOnline: true},
//     {id: 4, name: "prod-web", isOnline: true}
//   ];


@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit, OnDestroy {
  interval: any;
  sub: any;
  getSer = this.serverService.getServers();

  constructor(private serverService: ServerService) { }

  servers: Server[];

  ngOnInit(): void {
    this.refreshData();

    // this.interval = setInterval(()=>{
    //   this.refreshData();
    // },5000);
  }

  ngOnDestroy(){
    if(this.sub) {
      console.log("sub Destroyed");
      this.sub.unsubscribe();
    }
  }

  refreshData() {
    this.serverService.getServers().subscribe(res =>{
      this.servers = res;
      console.log('Refreshed');
    });

    this.subToData();
  }

  subToData() {
    this.sub = timer(1000).pipe().subscribe(() => this.refreshData());
  }

sendMessage(msg: ServerMessage){
  this.serverService.handleServerMessage(msg)
    .subscribe(res => console.log(res), err => console.log(err));
}
}
