import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {

  constructor() { }

  @Input() slist: any[];
  ngOnInit() {
    console.log(this.slist);
  }

}
