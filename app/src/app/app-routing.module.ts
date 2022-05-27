import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProfileComponent } from './composants/clients/client-profile/client-profile.component';
import { ClientsComponent } from './composants/clients/clients.component';
import { DashboardComponent } from './composants/clients/dashboard/dashboard.component';
import { EditClientsComponent } from './composants/clients/forms/edit-clients/edit-clients.component';
import { FormClientsComponent } from './composants/clients/forms/form-clients/form-clients.component';

const routes: Routes = [{ path: 'clients', component: ClientsComponent },
                        { path: 'add-client', component: FormClientsComponent },
                        { path: 'dashboard', component: DashboardComponent },
                        {path: 'client-profile/:id', component: ClientProfileComponent},
                        {path: 'edit-client/:id', component: EditClientsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
