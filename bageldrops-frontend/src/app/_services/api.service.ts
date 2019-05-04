import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { config } from '../_models';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private apis: Observable<any>;

    constructor(private http: HttpClient) {
        this.apis = this.http.get<any>(`${config.api}`, {params: new HttpParams().set('format', 'json')}).pipe(map(res => res));
    }

    get(name: string): Observable<any> {
        return this.apis.pipe(switchMap((apis) => {
            return this.http.get<any>(apis[name]);
        }));
    }

    getFromId(name: string, id: number): Observable<any> {
        return this.apis.pipe(switchMap((apis) => {
            return this.http.get<any>(apis[name].replace('/?', `/${id}?`));
        }));
    }

    post(name: string, options): Observable<any> {
        return this.apis.pipe(switchMap((apis) => {
            return this.http.post<any>(apis[name], options);
        }));
    }
}
