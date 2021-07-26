import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm;
  hide = true;
  constructor(private spinner: NgxSpinnerService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }


  getErrorEmail() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getLogin = async () => {
    this.spinner.show();
    const response =  await this.enviarDatos();
    const data : any = await response.json();
    console.log(data)
    if (data.status == 'OK' && data.usuario != undefined) {
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: `Hola de nuevo ${data.usuario.name} ${data.usuario.lastName}`,
      })
      this.loginForm.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se encontro el usuario'
      })
    }
    this.spinner.hide();
  }


  enviarDatos() {
    const getUser = fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      })
    });
    return getUser;
  }

}
