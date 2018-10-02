import { AnuncioService } from './../../services/anuncio.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Anuncio } from '../../models/anuncio.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public anuncios: Observable < Anuncio[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private anuncioService: AnuncioService) { }

  ngOnInit() {
    this.subjectPesquisa.pipe(//1 - Concatena operadores a ser executados em ms
      debounceTime(3000), //2 - executa a ação após 5 segundos
      distinctUntilChanged(),// 3 -  realiza pesquisas distintas
    map((texto:string)=>{ //4 - Fazer Validação to texto digitado no input
      if (texto.trim()==""){
        return new Observable<Anuncio[]>();
      }
      return this.anuncioService.findByNome(texto);
    })).subscribe(resultado =>{
      console.log(resultado);
      this.anuncios = resultado;
    })

  }
  public pesquisa(termoBusca: string):void{
    this.subjectPesquisa.next(termoBusca);

  }
  public limparPesquisa(): void{
    this.subjectPesquisa.next('');
  }

}
