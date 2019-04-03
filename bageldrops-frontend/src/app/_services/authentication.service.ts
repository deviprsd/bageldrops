import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, config } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get fullName(): string {
        const user = this.currentUserValue;
        return `${user.firstName} ${user.lastName}`;
    }


    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiAuth}/token/`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser'); // remove user from local storage to log user out
        this.currentUserSubject.next(null);
    }
}
