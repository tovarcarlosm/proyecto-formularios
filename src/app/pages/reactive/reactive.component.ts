import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ValidadoresService} from "../../services/validadores.service";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formUsuario: FormGroup;

  constructor(private fb: FormBuilder, private validador: ValidadoresService) {
    this.crearFormulario();
    this.cargarDatosInicialesFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get nombreNoValido(){
    return this.formUsuario.get('nombre').invalid && this.formUsuario.get('nombre').touched
  }

  get apellidoNoValido(){
    return this.formUsuario.get('apellido').invalid && this.formUsuario.get('apellido').touched
  }

  get usernameNoValido(){
    return this.formUsuario.get('username').invalid && this.formUsuario.get('username').touched
  }

  get emailNoValido(){
    return this.formUsuario.get('email').invalid && this.formUsuario.get('email').touched
  }

  get contrasenia1NoValida(){
    return this.formUsuario.get('contrasenia1').invalid && this.formUsuario.get('contrasenia1').touched;
  }

  get contrasenia2NoValida(){
    const contrasenia1 = this.formUsuario.get('contrasenia1').value;
    const contrasenia2 = this.formUsuario.get('contrasenia2').value;

    return (contrasenia1 !== contrasenia2);
  }

  get nomenclaturaNoValida(){
    return this.formUsuario.get('direccion.nomenclatura').invalid && this.formUsuario.get('direccion.nomenclatura').touched
  }

  get barrioNoValido(){
    return this.formUsuario.get('direccion.barrio').invalid && this.formUsuario.get('direccion.barrio').touched
  }

  get ciudadNoValida(){
    return this.formUsuario.get('direccion.ciudad').invalid && this.formUsuario.get('direccion.ciudad').touched
  }

  get comidaFavorita(){
    return this.formUsuario.get('comidaFavorita') as FormArray;
  }

  crearFormulario(){
    this.formUsuario = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        this.validador.noCarlos
      ] ],
      apellido: ['', Validators.required],
      username: ['',,this.validador.existeUsername],
      email: ['', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,3}$')
      ] ],
      contrasenia1:['', Validators.required],
      contrasenia2:['', Validators.required],
      direccion: this.fb.group({
        nomenclatura: ['', Validators.required],
        barrio: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      comidaFavorita: this.fb.array([])
    }, {
      validators: this.validador.passwordsIguales('contrasenia1', 'contrasenia2')
    })
  }

  cargarDatosInicialesFormulario(){
    this.formUsuario.setValue({
      nombre: 'Mauricio',
      apellido: 'Tovar',
      username: '',
      email: 'carlos@hotmail.com',
      contrasenia1: "Hola",
      contrasenia2: "Hola",
      direccion: {
        nomenclatura: 'Calle 7 # 3 - 8',
        barrio: 'Centro',
        ciudad: 'Armenia'
      },
      comidaFavorita: []
    })
  }

  crearListeners(){
    /*this.formUsuario.valueChanges.subscribe(valor => console.log(valor));
    this.formUsuario.statusChanges.subscribe(estado => console.log(estado));*/
    this.formUsuario.get('email').statusChanges.subscribe(console.log)
  }

  agregarComidaFavorita(){
    this.comidaFavorita.push( this.fb.control('', Validators.required ));
  }

  eliminarComidaFavorita(indice: number){
    this.comidaFavorita.removeAt(indice);
  }

  guardar(){
    console.log( this.formUsuario );
    if ( this.formUsuario.invalid ){
      return Object.values( this.formUsuario.controls ).forEach( control => {
        if(control instanceof FormGroup){
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      })
    }
    this.formUsuario.reset();
    console.log( this.formUsuario );
  }
}
