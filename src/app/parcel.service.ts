import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Parcel } from './parcel';
import {Observable} from 'rxjs/Rx';
import { Globals } from './globals';

@Injectable()
export class ParcelService {
  constructor(private globals: Globals, private http:Http) { }
    checkmeasurement(formvalue: any): Observable<Parcel> {
      let body = {
              "params": {
                length: formvalue.length,
                breadth: formvalue.breadth,
                width: formvalue.width,
                weight: formvalue.weight,
              },
              "function": "checkmeasurement"
            };
      
    let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.globals.API_BASE_URL+"measurement.php?1=123", bodyString, options) // ...using post request
                           .map(this.extractData, bodyString)
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    



  }


private extractData(res: Response ) {
    let body = res.json();
    return body || { };
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }




}
