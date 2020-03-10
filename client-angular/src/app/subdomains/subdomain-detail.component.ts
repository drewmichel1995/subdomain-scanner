import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubdomain } from './subdomain';
        
@Component({
  templateUrl: './subdomain-detail.component.html',
  styleUrls: ['./subdomain-detail.component.css']
})
export class SubdomainDetailComponent implements OnInit {
  pageTitle: string = 'Subdomain Detail'
  subdomain: ISubdomain;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');
    this.pageTitle += `: ${name}`;
    this.subdomain = {
      "domain": "squareup.com", 
      "name": name, 
      "ip": "74.122.190.83", 
      "source": "Forward DNS", 
      "tag": "dns", 
      "cidr": "74.122.190.0/24", 
      "asn": "15211", 
      "desc": "SQUARE - Square, Inc., US"
    }
  }

  onBack(): void {
    this.router.navigate(['/subdomains']);
  }

}
