import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from '../../Modules/accueil/accueil.component';
import { AccueilclassesComponent } from '../../Modules/accueilclasses/accueilclasses.component';
import { CartComponent } from '../../Modules/cart/cart.component';
import { ConfirmEmailComponent } from '../../Modules/confirm-email/confirm-email.component';
import { CoursesPerCategoryComponent } from '../../Modules/courses-per-category/courses-per-category.component';
import { ForgetPasswordComponent } from '../../Modules/forget-password/forget-password.component';
import { HomeComponent } from '../../Modules/home/home.component';
import { LoginComponent } from '../../Modules/login/login.component';
import { MylearningComponent } from '../../Modules/mylearning/mylearning.component';
import { PaymentsuccessComponent } from '../../Modules/paymentsuccess/paymentsuccess.component';
import { ProfileComponent } from '../../Modules/profile/profile.component';
import { RegisterComponent } from '../../Modules/register/register.component';
import { ResetPasswordComponent } from '../../Modules/reset-password/reset-password.component';
import { SingleCourseDetailComponent } from '../../Modules/single-course-detail/single-course-detail.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forget', component:ForgetPasswordComponent },
  { path: 'reset', component:ResetPasswordComponent },
  { path: 'profile', component:ProfileComponent },
  { path: 'confirmEmail', component:ConfirmEmailComponent },
  { path: 'coursesPerCategory', component:CoursesPerCategoryComponent },
  { path: 'singleCourseDetail/:id', component:SingleCourseDetailComponent },
  { path: 'coursesPerCategory', component:CoursesPerCategoryComponent },
  { path: 'singleCourseDetail/:id', component:SingleCourseDetailComponent },
  { path: 'accueil', component:AccueilComponent },
  { path: 'accueilclasses', component:AccueilclassesComponent },
  { path: 'cart', component:CartComponent },
  { path: 'paymentsuccess', component:PaymentsuccessComponent },
  { path: 'mylearning', component:MylearningComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourzeloCorehomeRoutingModule { }
