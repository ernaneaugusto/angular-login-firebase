import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService, UserLogin } from '../services/login.service';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  public loginSuccess: boolean | null = null;
  public alert = {
    class: '',
    message: 'Sem nada',
  };

  get form() {
    return this.formLogin.controls;
  }
  
  constructor(private readonly loginService: LoginService) { }
  
  public submitForm(): void {
    this.loginSuccess = null;

    if (this.formLogin.invalid) {
      return;
    }

    const user: UserLogin = {
      email: `${this.form.email.value}`,
      password: `${this.form.password.value}`,
    };
    debugger
    this.loginService.loginWithEmailAndPassword(user)
      .then((res) => {
        console.log("#### login sucesso", res);
        this.loginSuccess = true;
        this.alert.class = 'alert-success';
        this.alert.message = 'Usuário autenticado com sucesso!';
      })
      // .catch((error: FirebaseError) => {
        .catch((error: any) => {
        this.loginSuccess = false;
        this.alert.class = 'alert-danger';
        this.alert.message = 'E-mail ou Senha inválidos!';
        console.log("#### login error", error);
      });
  }
}
