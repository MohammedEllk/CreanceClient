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
  montant_tva? : number;
  montant_ttc? : number;
  restedu? : number;

  constructor(private clientService : ClientsService,
    private activatedRoute:ActivatedRoute,
    private router : Router) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.clientService.get(this.getId).subscribe(obj => {
      console.log("object",obj);
      this.client = obj[0];
      this.montant_tva = Number(obj[0].montant_ht) * (Number(obj[0].tauxTva)/100)
      this.montant_ttc = Number(this.montant_tva) + Number(obj[0].montant_ht);
      this.restedu = Number(this.montant_ttc) - Number(obj[0].versement_client);
    });
  }

}
