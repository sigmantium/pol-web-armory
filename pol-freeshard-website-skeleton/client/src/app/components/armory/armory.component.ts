import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// Models
import { Character } from '../../models/character.model';
import { Equipment } from '../../models/equipment.model';

// Services
import { CharacterService } from '../../services/character.service';
import { Subject } from 'rxjs';

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

  parentSubject: Subject<Equipment[]> = new Subject();

  constructor(
    private characterService: CharacterService
  ) { }

  async ngOnInit() {
    this.characters = await this.characterService.getAll();
  }

  public valueChanged() {
    this.character = this.characters.filter(char => char.name === this.selectedCharacter);
    this.parentSubject.next(this.character[0].equipment);
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
