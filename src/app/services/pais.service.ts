import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor( private http: HttpClient ) { }

  obtenerPaises(){

    return this.http.get('https://restcountries.com/v2/lang/es')
      .pipe(
        // @ts-ignore
        map( (resp:any[]) =>
          resp.map(pais => ({ nombre: pais.name, codigo: pais.alpha3Code }) )
        )
      )
  }
}

/*
map( (resp:any[]) =>
  resp.map(pais => console.log(pais) )
)*/
