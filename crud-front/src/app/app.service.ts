import { Injectable } from '@angular/core';

import { Data } from './app.interface';

// import the important
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import the important

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AppService {

	headers: Headers;
	options: RequestOptions;

  constructor(private http: Http) {
  	this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({ headers: this.headers });
  }

  getData(): Observable<Data[]> {
    return this.http.get('http://localhost:3000/showData', this.options).map((res: Response) => res.json());
  }

  editData(id: any): Observable<any> {
      return this.http.get('http://localhost:3000/getAccount/' + id, this.options).map((res: Response) => res.json());
  }

  setData(data: any): Observable<any> {
  	  return this.http.post('http://localhost:3000/addData', data, this.options).map((res: Response) => res.json());
  }

  updateData(data: any): Observable<any> {
      return this.http.put('http://localhost:3000/updateData', data, this.options).map((res: Response) => res.json());
  }
  
  deleteData(id: any): Observable<any> {
      return this.http.delete('http://localhost:3000/delete/' + id, this.options).map((res: Response) => res.json());
  }

}
