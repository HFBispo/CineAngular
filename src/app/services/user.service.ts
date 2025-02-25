import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';
  
  constructor(private http: HttpClient) { }

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/${userId}`
    );
  }
  
}
