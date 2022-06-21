import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { AuthenticatedResponse } from './../_interfaces/authenticated-response.model';
import { LoginInfo, LoginModel } from './../_interfaces/login.model';
import { NgForm } from '@angular/forms';
import { Settings } from '../settings';
import { catchError,finalize } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { AlertModule } from 'ng2-bootstrap/alert'
import { AlertModule } from 'ng2-bootstrap'

const SECURITY_URL = `${Settings.workSettingApi}/api/auth`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  
  invalidLogin: boolean | undefined;
  newUsers: boolean | undefined;
  credentials: LoginModel = {
    user_id: '', user_pwd: ''
  };
  loginInfo: 
  LoginInfo = {
    user_id: '',
    user_pwd: '',
    login_attempts: '',
    last_login_attempt: '',
    user_email: ''
  }
  userPassword: string = '';
  error: any;
  selectCompanies: string[] = ['alpha2.eservicereport','alpha3.eservicereport','qa2.eservicereport' ]
  company: string='';
  closeResult: string | undefined;

  constructor( private router: Router, private modalService: NgbModal, private http: HttpClient,
    private notificationService: NotificationService) {}

  ngOnInit(): void {}

  loginShow(content:any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-login'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed `;
    });
  }

  // close(alert: Alert) {
  //   this.alerts.splice(this.alerts.indexOf(alert), 1);
  // }

  async login(content: any): Promise<void> {
       this.credentials.user_pwd = this.userPassword;// btoa(this.userPassword);
        const info =  this.http
          .post<LoginInfo>(
            `${SECURITY_URL}/login`,
            this.credentials,
            {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            }
          ).pipe(
            finalize(() => (this.invalidLogin = false)),
            catchError(e => {
             this.invalidLogin = false;
              this.error = (e);
              console.log('user', this.error)
              return [];
            })
          )
          .subscribe(user => {
          
 
            if (!user) {
              this.notificationService.error('Error','Not User');
              
            } else {
             (response: AuthenticatedResponse) => {
             const token = response.token;
             localStorage.setItem('jwt', token);}
              this.loginInfo = user;
              this.modalService.dismissAll();
              this.openCompany(content);
            }
            
          });          
   }
 
   openCompany(content:any){
     this.modalService.open(content, {ariaLabelledBy: 'modal-company'}).result.then((result: any) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason: any) => {
       this.closeResult = `Dismissed `;
     });
   }
   loginActive(){
 
   }
 
   loginUpdatePass(){
 
   }
 
   loginLocked(){
 
   }
 
   companySelect(company:string){
     
     this.router.navigate(['/']);
 
   }
 
   newUser(): void {
     this.credentials.user_pwd = btoa(this.credentials.user_pwd);
     this.http
       .post<AuthenticatedResponse>(
         `${SECURITY_URL}/new-user`,
         this.credentials,
         {
           headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
         }
       )
       .subscribe({
         next: (result: any) => console.log(result),
         error: (err: HttpErrorResponse) => console.log(err.error),
       });
   }
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
 }








  // isUserAuthenticated = (): boolean => {
  //   const token = localStorage.getItem('jwt');

  //   if (token && !this.jwtHelper.isTokenExpired(token)) {
  //     this.router.navigate(['/company']);
  //     return true;

  //   }

  //   return false;
  // };

  // login(){
  //   this.router.navigate(['/login'])
  // }

  // logOut = () => {
  //   localStorage.removeItem('jwt');
  // };

