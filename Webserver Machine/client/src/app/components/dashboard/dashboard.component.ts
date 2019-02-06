import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public page: number;

  constructor() {
    this.page = 1;
  }

  ngOnInit() { }

  setPage(page: number) {
    this.page = page;
  }

}
