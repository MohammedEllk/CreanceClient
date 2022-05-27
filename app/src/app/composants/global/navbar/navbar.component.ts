import { Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { notifications } from 'src/app/models/notifications';
import { NotificationsService } from 'src/app/services/notifications.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { NotificationModalComponent } from '../modals/notification-modal/notification-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  disabledButton = false;
  constructor(private dialog : MatDialog,
    private notificationService :NotificationsService,
    private websocket : WebSocketService) { }
    notifcations? : notifications
  ngOnInit(): void {
    this.notificationService.getAll().subscribe(data => {
      this.notifcations = data.reverse();
      console.log("oppa",data);
    })

    this.websocket.listen("getNotifs").subscribe(obj => {
      console.log("notifications",obj);
    })

  }

  openModel() {
    this.disabledButton = true;
    let dialogRef = this.dialog.open(NotificationModalComponent, {
      width: '400px',
      height : '500px',
      data: this.notifcations
    });
    dialogRef.afterClosed().pipe().subscribe(obj=> {
      this.disabledButton = false;
    })

  }
}
