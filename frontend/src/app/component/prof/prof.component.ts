import { Component, OnInit } from '@angular/core';
import { Prof } from 'src/app/model/prof';
import { ProfService } from 'src/app/service/prof.service';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {

  public profs: Prof[] = [];

  constructor(profService: ProfService) { }

  async ngOnInit(): Promise<void> {
    //this.profs = await this.profService.getRooms();
    //console.log(this.profs);
  }

}
