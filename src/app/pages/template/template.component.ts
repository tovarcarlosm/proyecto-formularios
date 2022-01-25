import {Component, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";
import {PaisService} from "../../services/pais.service";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  paises: any[] = [];

  constructor( private _paisService: PaisService ) { }

  ngOnInit(): void {
        this._paisService.obtenerPaises()
          .subscribe( paises => {
            this.paises = paises;

            this.paises.unshift(
              { nombre: "Seleccione su nacionalidad", codigo: ""}
            )
          });
    }

  usuario = {
    nombres: '',
    apellidos: '',
    correo: '',
    pais: '',
    genero: ''
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
