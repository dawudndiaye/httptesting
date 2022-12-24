import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from './model/products';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AngularHttpRequest';
  allProducts: Product[]

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.fetchProducts();
  }

  onProductsFetch() {
    this.fetchProducts();
  }

  onProductCreate(products: {pName: string, desc: string, price: string}){
   console.log(products);
   const headers = new HttpHeaders({'MyHeader': 'myself'})
   this.http.post('https://httppractice-fbad7-default-rtdb.firebaseio.com/products.json', products, {headers: headers})
   .subscribe((res) => {
     console.log(res)
   });
  }
  private fetchProducts() {
    this.http.get<{[key: string]: Product}>('https://httppractice-fbad7-default-rtdb.firebaseio.com/products.json')
    .pipe(map((res) => {
      const products = [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key], id: key})
        }
       
      }
      return products;
    }))
    .subscribe((products) => {
      console.log(products)
      this.allProducts = products;
    })
  }
}


