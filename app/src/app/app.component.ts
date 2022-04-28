import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'clientCreance';
  constructor(private websocket : WebSocketService) {

  }
  ngOnInit(): void {
    //lister to an event from the socket io server 
    this.websocket.listen("test").subscribe(obj => {
      console.log("obj i b",obj);
    })
  }
}
