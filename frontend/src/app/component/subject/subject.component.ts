import { SubjectService } from "./../../service/subject.service";
import { Component, OnInit } from "@angular/core";
import { Subject } from "src/app/model/subject";
import { SelectItem } from "primeng/api/selectitem";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.css"],
})
export class SubjectComponent implements OnInit {
  public subjects: Subject[] = [];
  public sortOptions: SelectItem[];
  constructor(private subjService: SubjectService) {}

  async ngOnInit(): Promise<void> {
    this.subjects = await this.subjService.getSubjects();
    this.sortOptions = [
      { label: "Best rated", value: "rate" },
      { label: "Worst rated", value: "!rate" },
      { label: "Most kawaii", value: "-" },
    ];
  }
}
