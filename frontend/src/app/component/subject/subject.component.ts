import { SubjectService } from './../../service/subject.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/model/subject';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  public subjects: Subject[] = [];

  constructor(private subjService: SubjectService) { }

  async ngOnInit(): Promise<void> {
      this.subjects = await this.subjService.getSubjects();
      console.log("asd");
      console.log(this.subjects);
  }

}
