import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule,MatListModule} from "@angular/material";
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScanComponent } from './scan/scan.component';
import {ItemsService} from "./items.service";
import { EditComponent } from './edit/edit.component';
import { PictureComponent } from './picture/picture.component';



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Home'},
  },
  {
    path: 'scan',
    component: ScanComponent,
    data: {title: 'scan'},
  },
  {
    path: 'edit',
    component: EditComponent,
    data: {title: 'edit'},
  },
  {
    path: 'picture',
    component: PictureComponent,
    data: {title: 'picture'},
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScanComponent,
    EditComponent,
    PictureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [
    { provide: 'Quagga', useValue: window['Quagga'] },
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
