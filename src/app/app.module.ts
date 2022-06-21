import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NotificationService } from './notification.service';
import { CommonModule } from '@angular/common';
//import { AlertModule } from 'ng2-bootstrap/alert';
import { AlertModule } from 'ng2-bootstrap';

export function tokenGetter() {
  return localStorage.getItem('jwt');
  
}

@NgModule({
  declarations: [AppComponent,  HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,  
     JwtModule.forRoot
    ({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [AuthGuard, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
