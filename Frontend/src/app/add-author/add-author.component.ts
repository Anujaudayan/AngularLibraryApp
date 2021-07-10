import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  AuthorItem = {
    authorname       : '',
    nationality      : '',
    works            : '',
    career           : '',
    image            : ''
  }

  submitted =false;
  images    : any;

  constructor(public authorsObj : AuthorsService, private router:Router) { }


  ngOnInit(): void {
  }

  AddAuthor(){
    this.AuthorItem.image = this.AuthorItem.image.replace('C:\\fakepath\\','');
    this.authorsObj.newAuthor(this.images, this.AuthorItem);
    localStorage.setItem('authorAlertMsg', `The author ${this.AuthorItem.authorname} is added`); 
    this.router.navigate(['/authors']);   
  }

  selectImage(event : any) {
    console.log('select image')
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log('inside if event')
    }    
  }

}
