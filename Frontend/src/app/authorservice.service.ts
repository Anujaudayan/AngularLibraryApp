import { Injectable } from '@angular/core';
import {HttpClient ,HttpResponse} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class AuthorserviceService {

  item= {
    title :'',
    imageUrl:''}
  constructor( private http:HttpClient) { }
  getProduct(id:any){
    return this.http.get("http://localhost:3000/"+id);
  }
  getProducts(){
    return this.http.get("http://localhost:3000/authors");
  }

  newProduct(item:any)
  {   
    return this.http.post("http://localhost:3000/insert",{"author":item})
    .subscribe(data =>{console.log(data)})
  }
  deleteProduct(id:any)
  {

    return this.http.delete("http://localhost:3000/remove/"+id)

  }
  editProduct(author:any)
  {
    console.log('client update')
    return this.http.put("http://localhost:3000/update",author)
    .subscribe(data =>{console.log(data)})
  }
}

