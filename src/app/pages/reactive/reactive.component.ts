import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formUsuario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  get nombreNoValido(){
    return this.formUsuario.get('nombre').invalid && this.formUsuario.get('nombre').touched
  }

  get apellidoNoValido(){
    return this.formUsuario.get('apellido').invalid && this.formUsuario.get('apellido').touched
  }

  get emailNoValido(){
    return this.formUsuario.get('email').invalid && this.formUsuario.get('email').touched
  }

  crearFormulario(){
    this.formUsuario = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3)] ],
      apellido: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
      ] ]
    })
  }

  guardar(){
    if ( this.formUsuario.invalid ){
      Object.values( this.formUsuario.controls ).forEach( control => {
        control.markAsTouched();
      })
      return;
    }

    console.log( this.formUsuario );
  }
}
