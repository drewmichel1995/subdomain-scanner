import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: ` <div class='container'>
                  <pm-navbar></pm-navbar>
                  <router-outlet></router-outlet>
              </div>`,
  styleUrls: ['./app.component.css',]
})

export class AppComponent implements OnInit{
  
    constructor(){ }

    ngOnInit() : void { console.log('In OnInit');}
    
  }
