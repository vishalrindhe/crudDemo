import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataArray:any;
  formData:any;
  flag= false;
  clear = true;
  id: String='';
  url="http://localhost:8080";
  constructor(private http:HttpClient) { 
    
  }

  get(): Observable<any>{
    return this.http.get(this.url+'/get-all');
  }

  findOne(id:String): Observable<any>{
    return this.http.get(this.url+'/message/'+id);
  }

  addData(data:any): Observable<any>{
    return this.http.post(this.url+'/create',data);
  }

  update(id:String,data:any): Observable<any>{
    return this.http.put(this.url+'/message/'+id,data);
  }

  delete(id:String): Observable<any>{
    return this.http.delete(this.url+'/message/'+id);
  }
}
