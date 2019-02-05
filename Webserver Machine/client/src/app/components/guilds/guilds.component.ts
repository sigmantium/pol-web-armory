import { Component, OnInit } from '@angular/core';

// Models
import { Guild } from '../../models/guild.model';

// Services
import { GuildService } from '../../services/guild.service';

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})
export class GuildsComponent implements OnInit {
  private guilds: Guild[];

  constructor(
    private guildService: GuildService
  ) { }

  async ngOnInit() {
    this.guilds = await this.guildService.getAll();
  }

}
