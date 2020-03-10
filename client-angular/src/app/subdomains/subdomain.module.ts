import { NgModule } from '@angular/core';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { SubdomainDetailComponent } from './subdomain-detail.component';
import { SubdomainListComponent } from './subdomain-list.component';
import { RouterModule } from '@angular/router';
import { SubdomainDetailGuard } from './subdomain-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'subdomains', component: SubdomainListComponent },
      { path: 'subdomains/:name', component: SubdomainListComponent}
    ]),
    SharedModule
  ],

  declarations: [
    SubdomainListComponent,
    SubdomainDetailComponent,
    ConvertToSpacesPipe,
  ]
})
export class SubdomainModule { }