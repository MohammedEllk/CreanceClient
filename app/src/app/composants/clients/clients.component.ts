import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  displayedColumns = ['nom', 'montant_ht','delai_paiement','date_echeance','action',"mode_reglement","operation"];
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

  validerClient(element : any) {
    if(element.status == false) {
      this.clientService.valider(element.id).subscribe(obj => {
        console.log("obj",obj);
      })
    }
    

  }
}
