import { Component, OnInit } from '@angular/core';

// Models
import { Character } from '../../models/character.model';

// Services
import { CharacterService } from '../../services/character.service';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-armory',
  templateUrl: './armory.component.html',
  styleUrls: ['./armory.component.css']
})
export class ArmoryComponent implements OnInit {
  private characters: Character[];
  public selectedCharacter: string;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(
    private characterService: CharacterService
  ) { }

  async ngOnInit() {
    this.characters = await this.characterService.getAll();
  }

  characterSkills(index, character) {
    return character ? character.skills[index].skillName : undefined;
  }


  valueChanged($event) {
    console.log('Testing: ' + $event.value);
  }
}
