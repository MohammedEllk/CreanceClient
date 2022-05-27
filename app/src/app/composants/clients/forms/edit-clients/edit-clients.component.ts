import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { pipe } from 'rxjs';
import { clients } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.scss']
})
export class EditClientsComponent implements OnInit {
  client? : clients;
  clientForm : FormGroup;
  getId : any;
  constructor(private clientService : ClientsService ,
    private fb : FormBuilder,
    private Router: Router,
    private activatedRoute : ActivatedRoute) { 
      this.clientForm = this.fb.group({
        nom: ['',Validators.required],
        numero_facture : ['',Validators.required],
        addresse : ['',Validators.required],
        numero_telephon : ['',Validators.required],
        email : ['',Validators.required], 
        montant_ht: ['',Validators.required],
        versement_client: ['',Validators.required],
        tauxTva : ['',Validators.required],   
        delai_paiement: ['',Validators.required],     
        mode_reglement: ['',Validators.required],   
        commentaire : ['',Validators.required]      
      });
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.clientService.get(this.getId).subscribe(obj => {
      console.log("object",obj);
      this.client = obj[0];
      const objValue  = {
        nom  : obj[0].nom,
        addresse : obj[0].addresse,
        numero_facture : obj[0].numero_facture,
        numero_telephon : obj[0].numero_telephon,
        email : obj[0].email,
        montant_ht : obj[0].montant_ht,
        versement_client : obj[0].versement_client,
        tauxTva : obj[0].tauxTva,
        delai_paiement : obj[0].delai_paiement,
        mode_reglement : obj[0].mode_reglement,
        commentaire  : obj[0].commentaire
      }
      this.clientForm.setValue(objValue);
      console.log("this.client",this.client);
      console.log("this.clientForm",this.clientForm);

    });    
  }

  onSubmitForm() {
    if(this.client) {
      console.log("this.formControl",this.clientForm);
      console.log("this",this.client.id);
      this.clientService.update(this.client.id,this.clientForm.value).pipe().subscribe(obj => {
        console.log(obj);
      });
    }   
  }

}
