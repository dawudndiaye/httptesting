import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, throwError } from "rxjs";
import { map } from "rxjs";
import { Product } from "../model/products";


@Injectable({providedIn: "root"})


export class ProductService {

    
    error = new Subject<string>();
    constructor(private http: HttpClient){}
    createProduct(products: {pName: string, desc: string, price: string}){
        console.log(products);
        const headers = new HttpHeaders({'MyHeader': 'myself'})
        this.http.post('https://httppractice-fbad7-default-rtdb.firebaseio.com/products.json123', products, {headers: headers})
        .subscribe((res) => {
          console.log(res)
        }, (err) => {
            this.error.next(err.message);
        });
    }

    fetchProduct(){
        return this.http.get<{[key: string]: Product}>('https://httppractice-fbad7-default-rtdb.firebaseio.com/products.json')
        .pipe(map((res) => {
          const products = [];
          for(const key in res){
            if(res.hasOwnProperty(key)){
              products.push({...res[key], id: key})
            }
           
          }
          return products;
        }), catchError((err) => {
            //write lojik for loing eror
            return throwError(err)
        }))
    }

    deleteProduct(id : string){
        this.http.delete('https://httppractice-fbad7-default-rtdb.firebaseio.com/products/'+id+'.json').subscribe()
    }

    deleteAllProducts(){
        this.http.delete('https://httppractice-fbad7-default-rtdb.firebaseio.com/products.json').subscribe()
    }

    updateProduct(id: string, value: Product){
        this.http.put('https://httppractice-fbad7-default-rtdb.firebaseio.com/products/'+id+'.json', value).subscribe()
      }
}