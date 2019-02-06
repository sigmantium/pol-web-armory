import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

// Models
import { Guild } from '../../models/guild.model';

// Services
import { GuildService } from '../../services/guild.service';

// Interface
export interface GuildElement {
  guildid: number;
  abbr: string;
  name: string;
  type: string;
  master: string;
  website: string;
  members: number;
  allies: number;
  enemies: number;
}

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})
export class GuildsComponent implements OnInit {
  private guilds: Guild[];
  private data: GuildElement[];

  public dataSource: any;
  public displayedColumns: string[] = [
    'guildid',
    'abbr',
    'name',
    'type',
    'master',
    'members',
    'allies',
    'enemies',
    'website'
  ];

  constructor(
    private guildService: GuildService
  ) { }

  async ngOnInit() {
    this.guilds = await this.guildService.getAll();

    this.data = this.guilds;
    this.dataSource = new MatTableDataSource(this.data);
  }

}
