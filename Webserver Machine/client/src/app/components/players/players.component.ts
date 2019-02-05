import { Component, OnInit } from '@angular/core';

// Models
import { Player } from '../../models/player.model';

// Services
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  private players: Player[];

  constructor(
    private playerService: PlayerService
  ) { }

  async ngOnInit() {
    this.players = await this.playerService.getAll();
  }

}
