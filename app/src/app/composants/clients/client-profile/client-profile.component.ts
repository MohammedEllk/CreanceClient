import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'socket.io/dist/client';
import { clients } from 'src/app/models/clients';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  getId : any;
  client? : clients;

  constructor(private clientService : ClientsService,
    private activatedRoute:ActivatedRoute,
    private router : Router) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.clientService.get(this.getId).subscribe(obj => {
      console.log("object",obj);
      this.client = obj[0];
    });
  }

}
