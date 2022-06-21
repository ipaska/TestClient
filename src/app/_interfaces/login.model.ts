export interface LoginModel {
  user_id: string;
  user_pwd: string;
  
}
export interface LoginInfo {
  user_id: string;
  user_pwd: string;
  login_attempts: string;
  last_login_attempt: string;
  user_email : string;
}