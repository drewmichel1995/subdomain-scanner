import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { ISubdomain } from './subdomain';

@Injectable({
    providedIn: 'root'
})

export class SubdomainService{
    private subdomainUrl = 'http://127.0.0.1/server/'
    constructor(private http: HttpClient) { }
    
    getSubdomains(domain: any): Observable<ISubdomain[]> {
        var url = this.subdomainUrl + domain
        return this.http.get<ISubdomain[]>(url).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage)
    }
}