import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TableComponent } from './table/table.component';

import { CdkTableModule } from '@angular/cdk/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, TableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    NgbModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
