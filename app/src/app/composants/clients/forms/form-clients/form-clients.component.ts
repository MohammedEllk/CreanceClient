import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { clients } from 'src/app/models/clients';


@Component({
  selector: 'app-form-clients',
  templateUrl: './form-clients.component.html',
  styleUrls: ['./form-clients.component.scss']
})
export class FormClientsComponent implements OnInit {
  client? : clients;
  clientForm : FormGroup;
  constructor(private clientService : ClientsService ,private fb : FormBuilder,private Router: Router) { 
    this.clientForm = this.fb.group({
      nom: ['',Validators.required],
      prenom: ['',Validators.required],   
      montant: ['',Validators.required],   
      delai_paiement: ['',Validators.required],     
      mode_reglement: ['',Validators.required],   
      commentaire : ['',Validators.required]      
    });
  }

  ngOnInit(): void {
  }

  onSubmitForm() { 
    console.log("this.formControl",this.clientForm);
    this.clientService.create(this.clientForm.value).subscribe(input => {
      console.log(input);
    } );
  }

}
