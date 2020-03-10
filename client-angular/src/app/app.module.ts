import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'
import { SubdomainModule } from './subdomains/subdomain.module';
import { DomainModule } from './domains/domain.module';
import { DomainListComponent } from './domains/domain-list.component';
import { SubdomainListComponent } from './subdomains/subdomain-list.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent 
                ],
  imports: [ 
            BrowserModule,
            HttpClientModule,
            RouterModule.forRoot([
              { path: 'domains', component: DomainListComponent },
              { path: '', redirectTo: 'domains', pathMatch: 'full' },
              { path: '**', redirectTo: 'domains', pathMatch: 'full' }
            ]),
            SubdomainModule,
            DomainModule
          ],
  bootstrap: [AppComponent]
})
         
export class AppModule { }
//