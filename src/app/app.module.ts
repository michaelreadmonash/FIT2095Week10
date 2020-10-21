import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddactorComponent } from './addactor/addactor.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ListactorsComponent } from './listactors/listactors.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';

@NgModule({
  declarations: [
    AppComponent,
    AddactorComponent,
    AddmovieComponent,
    ListactorsComponent,
    ListmoviesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
