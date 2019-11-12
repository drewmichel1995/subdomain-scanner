import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ISubdomain } from './subdomain'
import { SubdomainService } from './subdomain.service';


@Component({
    selector: 'pm-subdomains',
    templateUrl: './subdomain-list.component.html',
    styleUrls: ['./subdomain-list.component.css']
})

export class SubdomainListComponent implements OnInit{
    pageTitle: string
    _listFilter: string;
    get listFilter() : string {
        return this._listFilter;
    }

    set listFilter(value: string){
        this._listFilter = value;
        this.filteredSubdomains = this.listFilter ? this.performFilter(this.listFilter) : this.subdomains
    }

    subdomains: ISubdomain[]; 
    filteredSubdomains: ISubdomain[];

        constructor(private subdomainService: SubdomainService, private route: ActivatedRoute, private router: Router){
            this.pageTitle = 'Subdomains';

            this.router.routeReuseStrategy.shouldReuseRoute = () => false;

        }

        ngOnInit() : void {
            console.log('In OnInit');

            let name =  this.route.snapshot.paramMap.get('name')
            this.subdomainService.getSubdomains(name).subscribe(subdomains => {
                this.subdomains = subdomains;
                this.filteredSubdomains = subdomains;

                this.pageTitle = subdomains[0].domain
            });
        }

        performFilter(filterBy: string) : ISubdomain[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.subdomains.filter((subdomain: ISubdomain) => 
                subdomain.ip.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }

        getRandomStar() : number {
            return Math.ceil(Math.random() * 5);
        }

        onRatingClicked(message: string): void {
            this.pageTitle = 'Subdomain selected: ' + message
        }
}