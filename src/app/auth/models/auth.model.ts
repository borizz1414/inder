export class AuthModel {
  access_token: string;
  refreshToken?: string;
  expiresIn?: Date;
  toke_type : string;

  setAuth(auth: any) {
    this.access_token = auth.access_token;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.toke_type = auth.toke_type;

  }
}
