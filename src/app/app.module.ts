import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { DataService } from './services/data.service';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { ListingsComponent } from './listings/listings.component';
import { CreateComponent } from './listings/edit/create/create.component';
import { EditComponent } from './listings/edit/edit.component';
import { NavComponent } from './nav/nav.component';

import { BikeResolve } from './resolvers/bike.resolve';

import { SearchPipe } from './search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrowseComponent,
    ListingsComponent,
    CreateComponent,
    EditComponent,
    NavComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    CookieModule.forRoot()
  ],
  providers: [
    DataService,
    AuthService,
    AuthGuard,
    BikeResolve,
    SearchPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
