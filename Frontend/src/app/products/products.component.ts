import { Component } from '@angular/core';
import { ProductService } from '../productservice.service';
import {AuthService} from '../auth.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'pm-products',
  templateUrl:'./products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  pageTitle: string = 'Book List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  books=[{
    title :'',
    author:'',
    genre:'',
    imageUrl:''}]
  
  toggleImage(): void{
    this.showImage = !this.showImage;
  }
  constructor(private router:Router,private productService: ProductService,public _auth:AuthService){   
    
  }
  ngOnInit(): void{
    this.productService.getProducts().subscribe((data)=>{
      this.books=JSON.parse(JSON.stringify(data));
  })
  }
 
  editProduct(book:any)
  {
    localStorage.setItem("editProductId", book._id.toString());
    this.router.navigate(['update']);

  }
  deleteProduct(book:any)
  {
    this.productService.deleteProduct(book._id)
      .subscribe((data) => {
        this.books = this.books.filter(p => p !== book);
      })
  

  }
}
  