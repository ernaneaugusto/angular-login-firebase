import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface UserLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _keys = {
    user: 'user',
  }
  public user: any;
  public error: any;

  constructor(
    // private readonly http: HttpClient,
    private readonly auth: AngularFireAuth,
  ) { }

  public async loginWithEmailAndPassword(userLogin: UserLogin): Promise<any> {
    const { email, password } = userLogin;
    const credential = await this.auth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.user = res.user;
        this.setUserInSessionStorage(this.user);
        console.log("### service success", this.user);
        return Promise.resolve(res);
      })
      .catch((error) => {
        this.error = error;
        console.log("### service error", this.error);
        return Promise.reject(this.error);
      });

    // try {
    //   const { email, password } = userLogin;
    //   const credential = await this.auth.signInWithEmailAndPassword(email, password);
    //   this.user = credential.user;
    //   this.setUserInSessionStorage(this.user);
    //   console.log("### service success", this.user);

    //   return this.user;
    // } catch (error) {
    //   this.error = error;
    //   console.log("### service error", this.error);
    //   return this.error;
    // }
  }

  private setUserInSessionStorage(user: any): void {
    sessionStorage.setItem(this._keys.user, JSON.stringify(user));
    // this.$user.next(user);
  }
}
