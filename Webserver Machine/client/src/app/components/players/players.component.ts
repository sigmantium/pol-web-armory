import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

// Models
import { Player } from '../../models/player.model';

// Services
import { PlayerService } from '../../services/player.service';

// Interface
export interface PlayerElement {
  name: string;
  gender: string;
  race: string;
  title_guild: string;
  title_prefix: string;
  title_suffix: string;
  title_race: string;
  guild: string;
  murderer: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  private players: Player[];
  private data: PlayerElement[];

  public dataSource: any;
  public displayedColumns: string[] = [
    'name',
    'gender',
    'race',
    'title_guild',
    'title_prefix',
    'title_suffix',
    'title_race',
    'murderer'
  ];

  constructor(
    private playerService: PlayerService
  ) { }

  async ngOnInit() {
    this.players = await this.playerService.getAll();

    this.data = this.players;
    this.dataSource = new MatTableDataSource(this.data);
  }

}
