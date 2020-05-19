import { CommentService } from "./../../service/comment.service";
import { AuthService } from "src/app/service/auth.service";
import { Component, OnInit } from "@angular/core";
import { Prof } from "src/app/model/prof";
import { ProfService } from "src/app/service/prof.service";
import { SelectItem } from "primeng/api/selectitem";
import { MenuItem } from "primeng/api/menuitem";
import { ConfirmationService, Message } from "primeng/api";
import { Comment } from "src/app/model/comment";

@Component({
  selector: "app-prof",
  templateUrl: "./prof.component.html",
  styleUrls: ["./prof.component.css"],
  providers: [ConfirmationService],
})
export class ProfComponent implements OnInit {
  profs: Prof[] = [];
  comments: string[] = [];
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
  selectedProf: Prof;
  selectedRate: number[];
  profForModify: Prof;
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

  sortKey: string;
  sortField: string;
  sortOrder: number;
  commtemp: Comment;

  constructor(
    private profService: ProfService,
    private confirmationService: ConfirmationService,
    public authService: AuthService,
    private commentService: CommentService
  ) {}

  async ngOnInit(): Promise<void> {
    this.getProf();
    this.sortOptions = [
      { label: "Most Members", value: "!rateCounter" },
      { label: "Best rated", value: "!overallR" },
      { label: "Worst rated", value: "overallR" },
    ];
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDeleteClick(subj: Prof) {
    this.profService.deleteProf(subj).then(async () => {
      this.getProf();
    });
  }
  onAddClick(name: string, rate: number) {
    this.profService.insertProf(name, rate).then(async () => {
      this.getProf();
      this.displayAdd = false;
    });
  }
  onModifyClick(name: string, rate: number) {
    this.profService
      .modifyProf(this.profForModify.id, name, Number(rate))
      .then(async () => {
        this.getProf();
        this.displayModify = false;
      });
  }
  showAddDialog() {
    this.displayAdd = true;
  }
  showModifyDialog(subj: Prof) {
    this.displayModify = true;
    this.profForModify = subj;
  }

  confirmDelete(subj: Prof) {
    this.confirmationService.confirm({
      message: "Are you sure that you dont need this Prof anymore?",
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

  async selectProf(subj: Prof) {
    this.displayWholeSubj = true;
    this.selectedProf = subj;
    this.selectedRate = await this.profService.getProfRating(subj);
    this.actualDiff = this.selectedRate[0].toFixed(1);
    this.actualUsef = this.selectedRate[1].toFixed(1);
    this.actualCuri = this.selectedRate[2].toFixed(1);

    this.comments = await this.profService.getProfComments(subj);
  }

  onDialogHide() {
    this.selectedProf = null;
    this.selectedRate = null;
    this.comments = null;
    this.actualDiff = null;
    this.actualUsef = null;
    this.actualCuri = null;
  }

  async addNewComment(subj: Prof, body: string) {
    this.commtemp = await this.commentService.addComment(
      this.authService.user.name,
      body
    );

    this.profService
      .addNewCommentToProf(subj, this.commtemp._id)
      .then(async () => {
        this.selectedProf = await this.profService.getSingleProf(subj);
        this.comments = await this.profService.getProfComments(subj);
        this.getProf();
      });
    this.body = null;
  }
  showAcceptComment(subj: Prof, body: string) {
    this.displayAcceptComment = true;
    this.validCommentBody = false;
    if (body) {
      this.validCommentBody = true;
      this.addNewComment(subj, body);
    }
  }

  handleRate() {
    if (this.DiffRateValue && this.UsefRateValue && this.CuriRateValue) {
      this.validRate = false;
    }
  }
  rateSubject(subj: Prof) {
    this.profService
      .rateProf(
        subj,
        this.DiffRateValue,
        this.UsefRateValue,
        this.CuriRateValue
      )
      .then(async () => {
        this.DiffRateValue = 0;
        this.UsefRateValue = 0;
        this.CuriRateValue = 0;
        this.getProf();
        this.selectedProf = await this.profService.getSingleProf(subj);
        this.selectedRate = await this.profService.getProfRating(subj);
        this.actualDiff = this.selectedRate[0].toFixed(1);
        this.actualUsef = this.selectedRate[1].toFixed(1);
        this.actualCuri = this.selectedRate[2].toFixed(1);
      });
  }
  async getProf() {
    this.profs = await this.profService.getProfs();
    for (const s of this.profs) {
      this.temp = await this.profService.getProfRating(s);
      s.ratesByDiction = this.temp[1].toFixed(1);
      s.ratesByHelpfulness = this.temp[2].toFixed(1);
      s.ratesByPreparedness = this.temp[3].toFixed(1);
      s.overallR = this.temp[0].toFixed(1);
    }
  }
}
