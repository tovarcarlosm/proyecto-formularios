import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noCarlos(control: FormControl): { [res:string]: boolean } {

    if(control.value.toLowerCase() === 'carlos'){
      return {
        noCarlos : true
      }
    }

    return null;
  }
}
