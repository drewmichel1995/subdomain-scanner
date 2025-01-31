
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router'


@Injectable({
    providedIn: 'root'
})

export class DomainService {
    private domainUrl = 'http://127.0.0.1/server/getAvailableDomains';

    constructor(private http: HttpClient, private router: Router) { }


    getDomains(): Observable<any[]> {
        var url = this.domainUrl;
        return this.http.get<any[]>(url).pipe(tap(data => console.log('All: ' + JSON.stringify(data))), catchError(this.handleError));
    }


    getPendingScans(): Observable<any[]> {
        var url = 'http://127.0.0.1/server/getPendingScans';
        return this.http.get<any[]>(url).pipe(tap(data => console.log('All: ' + JSON.stringify(data))), catchError(this.handleError));
    }

    scanDomains(): Observable<any[]>{
        var url = 'http://127.0.0.1/server/scanDomains';
        return this.http.get<any[]>(url).pipe(tap(data => console.log('All: ' + JSON.stringify(data))), catchError(this.handleError));
    }

    addDomain(domain: string) {
        var url = "http://127.0.0.1/server/addDomain"
      
        let formData: FormData = new FormData(); 
        formData.append("name", domain); 
        this.http.post(url, formData).subscribe((res)=>{ console.log(res) });
    }

    deletePendingScan(domain: string) {
        var url = "http://127.0.0.1/server/deletePendingScan"
      
        let formData: FormData = new FormData(); 
        formData.append("name", domain); 
        this.http.post(url, formData).subscribe((res)=>{ 
            console.log(res) 
        });
    }


    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        }
        else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
