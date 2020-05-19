import { CommentService } from './../../service/comment.service';
import { AuthService } from 'src/app/service/auth.service';
import { Subject } from "./../../model/subject";
import { SubjectService } from "./../../service/subject.service";
import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api/selectitem";
import { MenuItem } from "primeng/api/menuitem";
import { ConfirmationService, Message } from "primeng/api";
import { Comment } from 'src/app/model/comment';
@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.css"],
  providers: [ConfirmationService],
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  comments: Comment[] = [];
  commentsCounter: number;
  sortOptions: SelectItem[];
  modifyItems: MenuItem[];
  //public dialogMessages: Message[] = [];
  displayAdd = false;
  displayModify = false;
  displayWholeSubj = false;
  displayAcceptComment = false;
  validCommentBody = false;
  validRate = true;
  selectedSubject: Subject;
  selectedRate: number[];
  subjForModify: Subject;
  name: string;
  rate: number;
  msgs: Message[] = [];
  DiffRateValue: number;
  UsefRateValue: number;
  CuriRateValue: number;
  actualDiff: string;
  actualUsef: string;
  actualCuri: string;
  body: string;
  temp: number[];
  commtemp: Comment;
  sortKey: string;
  sortField: string;
  sortOrder: number;

  constructor(
    private subjService: SubjectService,
    private confirmationService: ConfirmationService,
    public authService: AuthService,
    private commentService: CommentService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getSubj();
    this.sortOptions = [
      { label: "Most Members", value: "!rateCounter" },
      { label: "Best rated", value: "!overallR" },
      { label: "Worst rated", value: "overallR" },
    ];
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

  onDeleteClick(subj: Subject) {
    this.subjService.deleteSubject(subj).then(async () => {
      this.getSubj();
    });
  }
  onAddClick(name: string, rate: number) {
    this.subjService.insertSubject(name, rate).then(async () => {
      this.getSubj();
      this.displayAdd = false;
    });
  }
  onModifyClick(name: string, rate: number) {
    this.subjService
      .modifySubject(this.subjForModify.id, name, Number(rate))
      .then(async () => {
        this.getSubj();
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
      key: "del",
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

  async selectSubject(subj: Subject) {
    this.displayWholeSubj = true;
    this.selectedSubject = subj;
    this.selectedRate = await this.subjService.getSubjectRating(subj);
    this.comments = await this.subjService.getSubjectComments(subj);
    console.log(this.comments);
    this.actualDiff = this.selectedRate[0].toFixed(1);
    this.actualUsef = this.selectedRate[1].toFixed(1);
    this.actualCuri = this.selectedRate[2].toFixed(1);

   // this.comments = await this.subjService.getSubjectComments(subj);
  }

  onDialogHide() {
    this.selectedSubject = null;
    this.selectedRate = null;
    this.comments = null;
    this.actualDiff = null;
    this.actualUsef = null;
    this.actualCuri = null;
  }

  async addNewComment(subj: Subject, body: string) {
    this.commtemp = await this.commentService.addComment(this.authService.user.name,body);
    this.subjService.addNewComment(subj,this.commtemp._id).then(async () => {
      this.selectedSubject = await this.subjService.getSingleSubject(subj);
      this.comments = await this.subjService.getSubjectComments(subj);
      this.getSubj();
    });
    this.body = null;
  }
  showAcceptComment(subj: Subject, body: string) {
    this.displayAcceptComment = true;
    this.validCommentBody = false;
    if (body) {
      this.validCommentBody = true;
      this.addNewComment(subj, body);
    }
  }

  handleRate() {
    if(this.DiffRateValue && this.UsefRateValue && this.CuriRateValue){
      this.validRate = false;
    }
  }
  rateSubject(subj: Subject){
    this.subjService.rateSubject(subj,this.DiffRateValue, this.UsefRateValue, this.CuriRateValue).then(async () => {
      this.DiffRateValue = 0;
      this.UsefRateValue = 0;
      this.CuriRateValue = 0;
      this.getSubj();
      this.selectedSubject = await this.subjService.getSingleSubject(subj);
      this.selectedRate = await this.subjService.getSubjectRating(subj);
      this.actualDiff = this.selectedRate[0].toFixed(1);
      this.actualUsef = this.selectedRate[1].toFixed(1);
      this.actualCuri = this.selectedRate[2].toFixed(1);
    });
  }
 async getSubj(){
    this.subjects = await this.subjService.getSubjects();
    for(let s of this.subjects){
      this.temp = await this.subjService.getSubjectRating(s);
      s.overallR = this.temp[0].toFixed(1);
      s.diffR = this.temp[1].toFixed(1);
      s.usefR = this.temp[2].toFixed(1);
      s.curiR = this.temp[3].toFixed(1);
  }
}
}
