import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { OverviewComponent } from './components/overview/overview.component';
import { MenuComponent } from './components/overview/menu/menu.component';
import { MenuItemComponent } from './components/overview/menu/menu-item/menu-item.component';
import { LoginComponent } from './components/login/login.component';
import { InvitelistComponent } from './components/overview/invitelist/invitelist.component';
import { SendinviteComponent } from './components/sendinvite/sendinvite.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SettingsComponent } from './components/overview/settings/settings.component';
import { HistoryComponent } from './components/overview/history/history.component';
import { AcceptinviteComponent } from './components/overview/acceptinvite/acceptinvite.component';
import { UserService } from './services/user/user.service';
import { TokenInterceptor } from './services/token.interceptor';
import { SelectinviteesComponent } from './components/sendinvite/selectinvitees/selectinvitees.component';



const appRoutes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'overview', component: OverviewComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'sendinvite', component: SendinviteComponent},
  { path: 'select', component: SelectinviteesComponent},
  { path: 'overview/settings', component: SettingsComponent},
  { path: 'overview/history', component: HistoryComponent},
  { path: 'overview/acceptinvite', component: AcceptinviteComponent},
  { path: '**', component: PageNotFoundComponent } // 404 page
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    OverviewComponent,
    MenuComponent,
    MenuItemComponent,
    LoginComponent,
    InvitelistComponent,
    SendinviteComponent,
    PageNotFoundComponent,
    SettingsComponent,
    HistoryComponent,
    AcceptinviteComponent,
    SelectinviteesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]


})
export class AppModule { }
