import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noCarlos(control: FormControl): { [res:string]: boolean } {
    if(!control.value){
      return null;
    }

    if(control.value.toLowerCase() === 'carlos'){
      return {
        noCarlos : true
      }
    }

    return null;
  }

  passwordsIguales(contrasenia1: string, contrasenia2: string){
    return ( formGroup: FormGroup) => {
      const contrasenia1Control = formGroup.controls[contrasenia1];
      const contrasenia2Control = formGroup.controls[contrasenia2];

      if(contrasenia1Control.value === contrasenia2Control.value){
        contrasenia2Control.setErrors(null);
      } else {
        contrasenia2Control.setErrors({noEsIgual: true});
      }
    }
  }

  existeUsername( control: FormControl ):Promise<ValidarError> | Observable<ValidarError> {
    if(!control.value){
      return Promise.resolve(null);
    }

    return new Promise( (resolve, reject) => {

      setTimeout( () => {
        if(control.value === 'pepito'){
          resolve( {existe: true})
        } else {
          resolve( null );
        }
      }, 3000)

    })
  }
}

interface ValidarError {
  [x:string] : boolean
}
