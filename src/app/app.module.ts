import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
