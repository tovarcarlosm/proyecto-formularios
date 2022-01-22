import {Component, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";
import {PaisService} from "../../services/pais.service";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor( private _paisService: PaisService ) { }

  ngOnInit(): void {
        this._paisService.obtenerPaises()
          .subscribe( paises => {
            console.log( paises );
          });
    }

  usuario = {
    nombres: '',
    apellidos: '',
    correo: ''
  }

  guardar(formUsuario: NgForm ){
    if ( formUsuario.invalid ){
      Object.values( formUsuario.controls ).forEach( control => {
        console.log( control );
      })
      return;
    }

    console.log(formUsuario);
    console.log(formUsuario.value);

  }
}
