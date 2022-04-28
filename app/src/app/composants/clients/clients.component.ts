import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  displayedColumns = ['nom', 'prenom', 'montant','delai_paiement','date_echeance','action',"mode_reglement","operation"];
  dataSource = [];
  constructor(private clientService : ClientsService) { }

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
}
