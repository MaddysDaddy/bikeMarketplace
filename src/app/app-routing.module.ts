import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { AuthGuard } from './auth.guard';
import { ListingsComponent } from './listings/listings.component';
import { BikeResolve } from './resolvers/bike.resolve';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: {
      bike: BikeResolve
    }
  },
  {
    path: 'browse',
    pathMatch: 'full',
    component: BrowseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listings',
    component: ListingsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
