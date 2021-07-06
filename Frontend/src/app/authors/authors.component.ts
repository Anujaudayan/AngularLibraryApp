import { Component } from '@angular/core';
import { ProductService } from '../productservice.service';
import { AuthorserviceService } from '../authorservice.service';
import {AuthService} from '../auth.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  pageTitle: string = 'Authers List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  authors=[{
    title :'',
    imageUrl:''}]
  
  toggleImage(): void{
    this.showImage = !this.showImage;
  }
  constructor(private router:Router,private authorService: AuthorserviceService,public _auth:AuthService){   
    
  }
  ngOnInit(): void{
    this.authorService.getProducts().subscribe((data)=>{
      this.authors=JSON.parse(JSON.stringify(data));
  })
  }
 
  editProduct(author:any)
  {
    localStorage.setItem("editProductId", author._id.toString());
    this.router.navigate(['update']);

  }
  deleteProduct(author:any)
  {
    this.authorService.deleteProduct(author._id)
      .subscribe((data) => {
        this.authors = this.authors.filter(p => p !== author);
      })
  

  }
}