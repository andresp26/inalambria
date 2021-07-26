import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm;
  hide = true;
  constructor(private spinner: NgxSpinnerService) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    });
  }

  ngOnInit(): void {
  }


  getErrorEmail() {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'Este campo es requerido';
    }
    return this.registerForm.controls.email.hasError('email') ? 'No es un correo valido' : '';
  }

  getErrorName() {
    if (this.registerForm.controls.name.hasError('required')) {
      return 'Este campo es requerido';
    }
  }

  getErrorlastName() {
    if (this.registerForm.controls.lastName.hasError('required')) {
      return 'Este campo es requerido';
    }
  }

  getErrordob() {
    if (this.registerForm.controls.dob.hasError('required')) {
      return 'Este campo es requerido';
    }
  }

  getErrorPassword() {
    if (this.registerForm.controls.password.hasError('required')) {
      return 'Este campo es requerido';
    }
    return this.registerForm.controls.password.hasError('pattern') ? `<p>* Al menos 8 caracteres de longitud  
            * Letras minusculas
            * Letras mayúsculas
            * Números     
            * Caracteres especiales
            * </p>` : '';
  }



  registrar  = async () => {
    this.spinner.show();
     const response = await this.enviarDatos()
     const data = await response.json();
     if (data.status == 'OK') {
      Swal.fire({
        icon: 'success',
        title: 'Registrado',
        text: 'Usuario creado exitosamente.',
      })
      this.registerForm.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrarse',
      })
    }
    this.spinner.hide();
  }


  enviarDatos() {
    const registrar = fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.registerForm.controls.name.value,
        email: this.registerForm.controls.email.value,
        lastName: this.registerForm.controls.lastName.value,
        dob: this.registerForm.controls.dob.value,
        password: this.registerForm.controls.password.value,
      })
    });
    return registrar;
  }



}
