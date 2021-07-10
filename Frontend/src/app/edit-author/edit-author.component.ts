import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  AuthorItem = {
    authorname       : '',
    nationality      : '',
    works            : '',
    career           : '',
    image            : ''
  }


  images : any;
  submitted : boolean = false;
  imageModified : boolean=false;
  imgPrev  : any ='';

  constructor(public authorsObj : AuthorsService, private router:Router) { }

  ngOnInit(): void {
    this.submitted = false;
    this.imageModified=false;
    let AuthorId = localStorage.getItem("editAuthorId");
    this.authorsObj.getAuthor(AuthorId)
    .subscribe((author)=>{
      this.AuthorItem =JSON.parse(JSON.stringify(author));;
      this.imgPrev    = this.AuthorItem.image;
      console.log(this.AuthorItem)
      });
  }

  EditAuthor(){
    this.AuthorItem.image = this.AuthorItem.image.replace('C:\\fakepath\\','');
    if (this.imageModified){
      this.authorsObj.editAuthorWithImage(this.images, this.AuthorItem);
    }
    else{
    this.authorsObj.editAuthor(this.AuthorItem);
    }
     localStorage.setItem('authorAlertMsg', `The author ${this.AuthorItem.authorname} is updated`); 
     this.router.navigate(['/authors']);   
  }

  selectImage(event : any) {
    this.imageModified= true;
    console.log('select image')
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log('inside if event')
    }    
  }

}
