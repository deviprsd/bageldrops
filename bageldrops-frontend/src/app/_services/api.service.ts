import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { config } from '../_models';
import { isUndefined } from 'util';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private apis: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.apis = new BehaviorSubject({});
        this.http.get<any>(`${config.api}`, {params: new HttpParams().set('format','json')}).subscribe((data) => {
            this.apis.next(data);
        })
    }

    get(name: string): Observable<any> {
        return this.http.get<any>(this.apis[name]);
    }

    post(name: string, options): Observable<any> {
        if(isUndefined(this.apis)) return new Observable();
        return this.http.post<any>(this.apis[name], options);
    }
}
