import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Cases} from '../models/cases';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'http://localhost:3000/';
const casesApiUrl = apiUrl + 'cases/';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  private handleError<T>(result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getCases(): Observable<Cases[]> {
    // noinspection JSUnusedLocalSymbols
    return this.http.get<Cases[]>(`${casesApiUrl}`)
      .pipe(
        tap(cases => console.log('fetched cases')),
        catchError(this.handleError([]))
      );
  }

  getCasesById(id: string): Observable<Cases> {
    const url = `${casesApiUrl}/${id}`;
    return this.http.get<Cases>(url).pipe(
      tap(_ => console.log(`fetched cases id=${id}`)),
      catchError(this.handleError<Cases>())
    );
  }

  addCases(cases: Cases): Observable<Cases> {
    return this.http.post<Cases>(casesApiUrl, cases, httpOptions).pipe(
      tap((c: Cases) => console.log(`added cases w/ id=${c.id}`)),
      catchError(this.handleError<Cases>())
    );
  }

  updateCases(id: number, cases: Cases): Observable<any> {
    const url = `${casesApiUrl}/${id}`;
    return this.http.put(url, cases, httpOptions).pipe(
      tap(_ => console.log(`updated cases id=${id}`)),
      catchError(this.handleError<any>())
    );
  }

  deleteCases(id: string): Observable<Cases> {
    const url = `${casesApiUrl}/${id}`;
    return this.http.delete<Cases>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted cases id=${id}`)),
      catchError(this.handleError<Cases>())
    );
  }
}
