// Core
import { Component, OnInit } from '@angular/core';

// Router
import { ActivatedRoute, Router } from '@angular/router';

// JSON
import wiki from '../wiki.json';

@Component({
  selector: 'app-wiki-detail',
  templateUrl: './wiki-detail.component.html',
  styleUrls: ['./wiki-detail.component.css']
})
export class WikiDetailComponent implements OnInit {
  private skill: string;
  private title: string;
  private description: string;
  private training: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.skill = this.route.snapshot.paramMap.get('skill');

    if (!wiki.hasOwnProperty(this.skill)) {
      this.router.navigate(['wiki']);
    }

    this.title = wiki[this.skill].title;
    this.description  = wiki[this.skill].description;
    this.training = wiki[this.skill].training;
  }

}
