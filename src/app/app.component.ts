import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  slist: object[];

  constructor(elm: ElementRef) {
    // this.slist = JSON.parse("{\"n\":\"Joe\"}");
    // this.slist = JSON.parse("[{stid: 1, date: '20170108', name: 'Joe'}]");
    this.slist = JSON.parse( elm.nativeElement.getAttribute('slist').slice());
    // console.log(this.slist);
  }

}
