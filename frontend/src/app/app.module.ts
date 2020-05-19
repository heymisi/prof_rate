import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuBarComponent } from "./component/menu-bar/menu-bar.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TabMenuModule } from "primeng/tabmenu";
import { ProfComponent } from "./component/prof/prof.component";
import { SubjectComponent } from "./component/subject/subject.component";
import { LoginComponent } from "./component/login/login.component";
import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { PasswordModule } from "primeng/password";
import { HttpClientModule } from "@angular/common/http";
import { TabViewModule } from "primeng/tabview";
import { RegistrationComponent } from "./component/registration/registration.component";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { DataViewModule } from "primeng/dataview";
import { PaginatorModule } from "primeng/paginator";
import { SplitButtonModule } from "primeng/splitbutton";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { RatingModule } from "primeng/rating";
import { FileUploadModule } from "primeng/fileupload";
import { ToolbarModule } from "primeng/toolbar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { VirtualScrollerModule } from "primeng/virtualscroller";
import { PanelModule } from "primeng/panel";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { TooltipModule } from "primeng/tooltip";
@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ProfComponent,
    SubjectComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    ButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    TabMenuModule,
    MenubarModule,
    PasswordModule,
    HttpClientModule,
    TabViewModule,
    DropdownModule,
    TableModule,
    DataViewModule,
    PaginatorModule,
    SplitButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    RatingModule,
    FileUploadModule,
    ToolbarModule,
    InputTextareaModule,
    VirtualScrollerModule,
    PanelModule,
    OverlayPanelModule,
    TooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
