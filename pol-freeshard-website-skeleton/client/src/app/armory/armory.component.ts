import { Component, OnInit } from '@angular/core';

// Models
import { Armory } from '../models/armory.model';

// Services
import { ArmoryService } from '../armory/armory.service';

@Component({
  selector: 'app-armory',
  templateUrl: './armory.component.html',
  styleUrls: ['./armory.component.css']
})
export class ArmoryComponent implements OnInit {
  private armories: Armory[];

  constructor(
    private armoryService: ArmoryService
  ) { }

  async ngOnInit() {
    this.armories = await this.armoryService.getAll();
  }

  onSubmit() {
    console.log('Submit!');
  }
}
