// Core
import { Component, OnInit } from '@angular/core';

// Models
import { Character } from '../../models/character.model';
import { Equipment } from '../../models/equipment.model';

// Services
import { CharacterService } from '../../services/character.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-armory',
  templateUrl: './armory.component.html',
  styleUrls: ['./armory.component.css']
})
export class ArmoryComponent implements OnInit {
  // Service-related variables
  private character: Character[];
  private characters: Character[];

  // Event-related variable
  public selectedCharacter: string;

  // Subject-related variables
  armorySubject: Subject<Equipment[]> = new Subject();

  /**
   * Class Description Title
   * @implements OnInit
   * @class ArmoryComponent
   * @classdesc Armory component class
   * @param {CharacterService} characterService The character service
   */
  constructor(
    private characterService: CharacterService
  ) { }

  /**
   * ngOnInit Description
   * Initiates and assigns all variables
   * @async
   * @method ServerStatisticsComponent#ngOnInit
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    // Get data from database
    this.characters = await this.characterService.getAll();
  }

  /**
   * valueChanged Description
   * Event-based function attached to a select-component
   */
  public valueChanged(): void {
    this.character = this.characters.filter(char => char.name === this.selectedCharacter);
    this.armorySubject.next(this.character[0].equipment);
  }

  /**
   * getStats Description
   * @returns {any}
   */
  public getStats(): any {
    return this.character[0].stats;
  }

  /**
   * getSkills Description
   * @returns {any}
   */
  public getSkills(): any {
    return this.character[0].skills;
  }

  /**
   * getEquipment Description
   * @returns {any}
   */
  public getEquipment(): any {
    return this.character[0].equipment;
  }

}
