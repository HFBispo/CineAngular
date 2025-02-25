import { Injectable } from '@angular/core';
import { PagePath } from '../models/pagePath';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  breadcrumbSubject$: Subject<Array<PagePath>> = new Subject<Array<PagePath>>;

  constructor() { }

}
