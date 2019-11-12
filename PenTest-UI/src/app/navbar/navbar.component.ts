import { Component, OnInit } from '@angular/core';
import { DomainService } from '../domains/domain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pageTitle: string = 'PenTest'
  isLoaded = true;

    domains: any
    pendingScans: any
    constructor(private domainService: DomainService, private router: Router){
        
    }

    ngOnInit() : void {
      console.log('In OnInit');
      this.domainService.getDomains().subscribe(domains => {
          this.domains = domains;
      });

      this.domainService.getPendingScans().subscribe(scans => {
        this.pendingScans = scans;
      });
    }

    onEventClick(domain_name: string){
        var route = "/subdomains/" + domain_name
        console.log(route)
        this.router.navigate([route])
    }

    onRunScan(){
        this.isLoaded = false

        this.domainService.scanDomains().subscribe(res => {
          
          console.log(res);
          this.domainService.getDomains().subscribe(domains => {
                  this.domains = domains
          });
            
          this.domainService.getPendingScans().subscribe(scans => {
                  this.pendingScans = scans;
                  this.router.navigate(["domains"])
          });  

          this.isLoaded = true
        });

    }

    onNameAdd(domain: string){
      
      this.domainService.addDomain(domain);

    }

    onDeletePendingDomain(domain: string){

      this.domainService.deletePendingScan(domain);
      this.domainService.getPendingScans().subscribe(scans => {
        this.pendingScans = scans;
      });
      
    }

}
