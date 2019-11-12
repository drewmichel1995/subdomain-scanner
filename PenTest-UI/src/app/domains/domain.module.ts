import { NgModule } from '@angular/core';
import { DomainListComponent } from './domain-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SubdomainListComponent } from '../subdomains/subdomain-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'domains', component: DomainListComponent },
      { 
        path: 'domains/:name', 
        canActivate: [ SubdomainListComponent, ], 
        component: SubdomainListComponent 
      },
    ]),
    SharedModule
  ],

  declarations: [
    DomainListComponent,
  ]
})

export class DomainModule { }
