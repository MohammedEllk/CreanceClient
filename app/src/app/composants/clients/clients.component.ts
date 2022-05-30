import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clients } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  displayedColumns = ['nom', 'montant_ht','delai_paiement','date_echeance','action',"mode_reglement","operation"];
  dataSource : clients [];
  constructor(private clientService : ClientsService,
              private router: Router) { 
                this.dataSource = [];
              }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(value => {
      console.log(value);
      this.dataSource = value;
    })
  }

  deleteClient(id : number) {
    this.clientService.delete(id).subscribe(obj => {
      console.log(obj);
    })
  }

  validerClient(element : clients) {
    if(element.status == false && element.action != "en_demeure") {
      this.clientService.valider(element.id).subscribe(obj => {
        console.log("obj",obj);
      })
    }
    console.log("this.dataSource",this.dataSource);
    const objIndex = this.dataSource.findIndex((obj => obj == element));
    if(objIndex >= 0) {
      this.dataSource[objIndex].status = true;
    }
  }
}
