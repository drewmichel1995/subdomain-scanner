import { Component, OnInit } from '@angular/core'
import { DomainService } from './domain.service';
import { Router } from '@angular/router';

@Component({
    selector: 'pm-domains',
    templateUrl: './domain-list.component.html',
    styleUrls: ['./domain-list.component.css']
})

export class DomainListComponent implements OnInit {
    pageTitle: string
    domains: any[]
    pendingScans: any[]
    constructor(private domainService: DomainService, private router:Router){
        this.pageTitle = "Domains"
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    }

    ngOnInit() : void {
        console.log('In OnInit');
        this.domainService.getDomains().subscribe(domains => {
            this.domains = domains;
        });

        this.domainService.getPendingScans().subscribe(scans => {
            this.pendingScans = scans;
        });

        console.log(this.domains);
    }
}