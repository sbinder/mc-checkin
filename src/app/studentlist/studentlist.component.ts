import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {

  constructor() { }

  lastdate: string;


  @Input() slist: any[];

  ngOnInit() {
    this.sortslist();
  }

  checkDate(newdate) {
    if (newdate === this.lastdate) {
      return false;
    }
    this.lastdate = newdate;
    return true;
  }

  getdate(ds: string) {
    const d = new Date(+ds.substr(0,4), +ds.substr(4,2), +ds.substr(6));
    return d;
  }

  gotClicked(id) {
    switch (this.getStatus(id)) {
      case 'present':
      this.setStatus(id, '');
      break;
      case 'sent':
        this.setStatus(id, 'present');
      break;
      default:
      this.setStatus(id, 'sent');
    }
  }

  getStatus(id): string {
    let r = '';
    this.slist.forEach(element => {
      if (id === element.s) {
        r = element.c;
      }
    });
    return r;
  }

  setStatus(id, newstat) {
    this.slist.forEach(element => {
      if (id === element.s) {
        element.c = newstat;
      }
    });
  }

  sortslist() {
    this.slist.sort((a, b) => {
      if (a.d < b.d)
      {
        return -1;
      } else if (a.d > b.d)
      {
        return 1;
      } else if (a.n < b.n)
      {
        return -1;
      } else if (a.n > b.n)
      {
        return 1;
      } else { return 0; }

    });
    // console.log(this.slist);
  }
}
