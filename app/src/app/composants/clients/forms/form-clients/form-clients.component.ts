import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { clients } from 'src/app/models/clients';
import { WebSocketService } from 'src/app/services/web-socket.service';


@Component({
  selector: 'app-form-clients',
  templateUrl: './form-clients.component.html',
  styleUrls: ['./form-clients.component.scss']
})
export class FormClientsComponent implements OnInit {
  client? : clients;
  clientForm : FormGroup;
  constructor(private clientService : ClientsService ,
    private fb : FormBuilder,
    private router: Router,
    private websocket : WebSocketService) { 
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
  }

  ngOnInit(): void {
    this.websocket.listen("message").subscribe(obj => {
      console.log("obj i b",obj);
    })
  }
  

  onSubmitForm() { 
    console.log("this.formControl",this.clientForm);
    this.clientService.create(this.clientForm.value).pipe().subscribe(input => {
      console.log("appp",input);
      
    } );
    this.router.navigate(['clients']);
    console.log('abcdokf');

  }

}
