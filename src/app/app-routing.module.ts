import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { LoginComponent } from './login/login.component';
import { PopupComponent } from './popup/popup.component';
import { AuthGuard } from '../app/utility/app.guard';

const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'popup', component: PopupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
