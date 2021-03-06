import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { element } from 'protractor';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {

  ClassHub: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  lastdate: string;


  @Input() slist: any[];

  ngOnInit() {
    this.sortslist();
    let my = this;
    $.connection.hub.url = 'http://localhost:55199/signalr'; // TESTING ONLY
    // Declare a proxy to reference the hub.
    this.ClassHub = $.connection.classHub;
    // Create a function that the hub can call to broadcast messages.
    this.ClassHub.client.broadcastCheckin = function (stid, status) {
      if (status) {
        my.setStatus(stid, 'present');
      } else {
        my.setStatus(stid, '');
      }
      my.changeDetector.detectChanges();
    };
    $.connection.hub.start()
    .done(() => {
      my.ClassHub.server.joinGroup(1);
    });
    // set up initial display
    let pcount = 0;
    this.slist.forEach(element => {
      if (element.p) {
        element.c = 'present';
        pcount ++;
      }
    });
}

  sendMessage(stid: number, status: boolean) {
    this.ClassHub.server.checkin(1, stid, status);
  }

  checkDate(newdate) {
    if (newdate === this.lastdate) {
      return false;
    }
    this.lastdate = newdate;
    return true;
  }

  getdate(ds: string) {
    // console.log('date from server', ds);
    const d = new Date(+ds.substr(0, 4), +ds.substr(4, 2) - 1, +ds.substr(6));
    return d;
  }

  gotClicked(id) {
    switch (this.getStatus(id)) {
      case 'present':
         this.setStatus(id, '');  // preemptively
        this.sendMessage(id, false);
        break;
      default:
        this.setStatus(id, 'sent');
        this.sendMessage(id, true);
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
    this.slist.forEach((element, i) => {
      if (id === element.s) {
        element.c = newstat;
        // console.log(this.slist);
      }
    });
  }

  sortslist() {
    this.slist.sort((a, b) => {
      if (a.d < b.d) {
        return -1;
      } else if (a.d > b.d) {
        return 1;
      } else if (a.n < b.n) {
        return -1;
      } else if (a.n > b.n) {
        return 1;
      } else { return 0; }

    });
    // console.log(this.slist);
  }
}
