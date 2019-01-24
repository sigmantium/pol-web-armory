import { Component, OnInit } from '@angular/core';

// Models
import { TestService } from '../models/testservice.model';

// Services
import { TestserviceService } from '../testservice/testservice.service';

@Component({
  selector: 'app-testservice',
  templateUrl: './testservice.component.html',
  styleUrls: ['./testservice.component.css']
})
export class TestserviceComponent implements OnInit {
  private testservices: TestService[];

  constructor(
    private testserviceService: TestserviceService
  ) { }

  async ngOnInit() {
    this.testservices = await this.testserviceService.getAll();
  }

  onGet() {
    return this.testserviceService
      .get('5c49f5e9d937782d7833e85f')
      .then((result) => console.log('Results: ' + JSON.stringify(result)));
  }

  onFind() {
    return this.testserviceService
      .getAll()
      .then((result) => console.log('Results: ' + JSON.stringify(result)));
  }
}
