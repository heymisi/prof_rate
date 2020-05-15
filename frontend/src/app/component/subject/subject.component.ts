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
  providers: [ConfirmationService],
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  sortOptions: SelectItem[];
  modifyItems: MenuItem[];
  //public dialogMessages: Message[] = [];
  displayAdd = false;
  displayModify = false;
  displayWholeSubj = false;
  selectedSubject: Subject;
  subjForModify: Subject;
  name: string;
  rate: number;
  msgs: Message[] = [];
  val1: number;
  val2: number;
  val3: number;
  constructor(
    private subjService: SubjectService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.subjects = await this.subjService.getSubjects();
    this.sortOptions = [
      { label: "Most Members", value: "rate" },
      { label: "Best rated", value: "!rate" },
      { label: "Worst rated", value: "-" },
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
  confirmDelete(subj: Subject) {
    this.confirmationService.confirm({
      message: "Are you sure that you dont need this subject anymore?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.onDeleteClick(subj);
        this.msgs = [
          { severity: "info", summary: "Confirmed", detail: "Record deleted" },
        ];
      },
      reject: () => {
        this.msgs = [
          {
            severity: "info",
            summary: "Rejected",
            detail: "You have rejected",
          },
        ];
      },
    });
  }

  selectSubject(subj: Subject) {
    this.displayWholeSubj = true;
    this.selectedSubject = subj;
  }
  onDialogHide() {
    this.selectedSubject = null;
  }
}
