import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpParamsOptions } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { ServerMessage } from '../shared/server-message';
import { Server } from '../shared/server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  constructor(private http: HttpClient) { 
    // this.options.headers = new HttpHeaders({
    //   'Content-Type':  'application/json',
    //   'Accpt': 'q=0.8;application/json;q=0.9'
    // })
  }

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type':  'application/json',
      'Accpt': 'q=0.8;application/json;q=0.9'
    })
  };

  

  getServers(): Observable<any> {
    return this.http.get('https://localhost:7242/api/server')
      .pipe(map(res => res),
      catchError(this.handleError));
  }

  handleError(error: any){
    const errorMsg = (error.message) ? error.message : error.starts ? `${error.starts} - ${error.statusText}` : 'Server error';

    console.log(errorMsg);
    return throwError(() => new Error (errorMsg));
  }

  handleServerMessage(msg: ServerMessage): Observable<Object> {
    const url = 'https://localhost:7242/api/server/' + msg.id;
    return this.http.put(url, msg, this.httpOptions).pipe(map(res => res || null));
  }
}
