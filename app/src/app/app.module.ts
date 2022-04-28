import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './composants/clients/clients.component';
import { FormClientsComponent } from './composants/clients/forms/form-clients/form-clients.component';
import { ClientProfileComponent } from './composants/clients/client-profile/client-profile.component';
import { NavbarComponent } from './composants/global/navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EditClientsComponent } from './composants/clients/forms/edit-clients/edit-clients.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    FormClientsComponent,
    ClientProfileComponent,
    NavbarComponent,
    EditClientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
