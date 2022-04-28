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
      prenom: ['',Validators.required],   
      montant: ['',Validators.required],   
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
        prenom : obj[0].prenom,
        montant : obj[0].montant,
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
