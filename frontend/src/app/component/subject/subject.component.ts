import { Subject } from "./../../model/subject";
import { SubjectService } from "./../../service/subject.service";
import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api/selectitem";
import { MenuItem } from "primeng/api/menuitem";
import { ConfirmationService, Message } from "primeng/api";
@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.css"],
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  sortOptions: SelectItem[];
  modifyItems: MenuItem[];
  //public dialogMessages: Message[] = [];
  displayAdd = false;
  displayModify = false;
  subjForModify: Subject;
  name: string;
  rate: number;
  constructor(private subjService: SubjectService) {}

  async ngOnInit(): Promise<void> {
    this.subjects = await this.subjService.getSubjects();
    this.sortOptions = [
      { label: "Best rated", value: "rate" },
      { label: "Worst rated", value: "!rate" },
      { label: "Most kawaii", value: "-" },
    ];
  }
  onDeleteClick(subj: Subject) {
    this.subjService.deleteSubject(subj).then(async () => {
      this.subjects = await this.subjService.getSubjects();
    });
  }
  onAddClick(name: string, rate: number) {
    console.log(name, rate);
    this.subjService.insertSubject(name, rate).then(async () => {
      this.subjects = await this.subjService.getSubjects();
      this.displayAdd = false;
    });
  }
  onModifyClick(name: string, rate: number) {
    this.subjService
      .modifySubject(this.subjForModify.id, name, Number(rate))
      .then(async () => {
        this.subjects = await this.subjService.getSubjects();
        this.displayModify = false;
      });
  }
  showAddDialog() {
    this.displayAdd = true;
  }
  showModifyDialog(subj: Subject) {
    this.displayModify = true;
    this.subjForModify = subj;
  }
}
