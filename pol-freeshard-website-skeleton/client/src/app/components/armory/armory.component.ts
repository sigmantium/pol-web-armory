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
  private character: Character[];
  private characters: Character[];
  public selectedCharacter: string;

  constructor(
    private characterService: CharacterService
  ) { }

  async ngOnInit() {
    this.characters = await this.characterService.getAll();
  }

  valueChanged() {
    this.character = this.characters.filter(char => {
      return char.name === this.selectedCharacter;
    });

    this.getStats();
    this.getSkills();
    this.getEquipment();
  }

  public getStats() {
    return this.character[0].stats;
  }

  public getSkills() {
    return this.character[0].skills;
  }

  public getEquipment() {
    return this.character[0].equipment;
  }

}
