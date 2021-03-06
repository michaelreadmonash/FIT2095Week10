import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddactorComponent } from './addactor/addactor.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ListactorsComponent } from './listactors/listactors.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseService } from './database.service';
import { DeleteactorComponent } from './deleteactor/deleteactor.component';
import { UpdateactorComponent } from './updateactor/updateactor.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { ActortomovieComponent } from './actortomovie/actortomovie.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Listmoviebefore2019Component } from './listmoviebefore2019/listmoviebefore2019.component';

const week10Routes:Routes=[
  {path: 'addactor', component: AddactorComponent},
  {path: 'addmovie', component: AddmovieComponent},
  {path: 'listactors', component: ListactorsComponent},
  {path: 'listmovies', component: ListmoviesComponent},
  {path: 'deleteactor', component: DeleteactorComponent},
  {path: 'updateactor', component: UpdateactorComponent},
  {path: 'deletemovie', component: DeletemovieComponent},
  {path: 'actortomovie', component: ActortomovieComponent},
  {path: 'listmoviebefore2019', component: Listmoviebefore2019Component},
  {path: '', redirectTo: '/listactors', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddactorComponent,
    AddmovieComponent,
    ListactorsComponent,
    ListmoviesComponent,
    DeleteactorComponent,
    UpdateactorComponent,
    DeletemovieComponent,
    ActortomovieComponent,
    NotfoundComponent,
    Listmoviebefore2019Component
  ],
  imports: [
    RouterModule.forRoot(week10Routes), BrowserModule, HttpClientModule, FormsModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})

export class AppModule { }
