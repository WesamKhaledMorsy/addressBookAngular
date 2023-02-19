import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
constructor(){

}
isAddMode :boolean =true;

ngOnInit(): void {
  console.log('book')
}
AddMode(){
  this.isAddMode=false;
}
}
