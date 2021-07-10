import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'app-delete-author',
  templateUrl: './delete-author.component.html',
  styleUrls: ['./delete-author.component.css']
})
export class DeleteAuthorComponent implements OnInit {

    AuthorItem = {
      authorname       : '',
      nationality      : '',
      works            : '',
      career           : '',
      image            : ''
    }

 constructor(public authorObj : AuthorsService, private router:Router) { }

  ngOnInit(): void {

    let AuthorId = localStorage.getItem("deleteAuthorId");
    console.log(`inside delete init deleteAuthorId ${AuthorId}`);
    this.authorObj.getAuthor(AuthorId)
    .subscribe((author)=>{
      this.AuthorItem =JSON.parse(JSON.stringify(author));;
      console.log(this.AuthorItem)
      });
  }

  DeleteAuthor(){
    let AuthorId = localStorage.getItem("deleteAuthorId");
    console.log(`inside delete function deleteauthorId ${AuthorId}`);
    this.authorObj.deleteAuthor(this.AuthorItem);
    localStorage.setItem('authorAlertMsg', `The book ${this.AuthorItem.authorname} is deleted`); 
    this.router.navigate(['/authors']);   
  }

}
