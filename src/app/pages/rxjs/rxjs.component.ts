import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable().subscribe(numero => console.log('subs', numero),
      error => console.error('Error en obs', error),
      () => console.log('El observador termino'));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      setInterval(() => {
        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        /*if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }*/

        /*if (contador === 2) {
          observer.error('Auxilio');
        }*/
      }, 1000);
    }).pipe(
      map((resp: any) => resp.valor),
      filter((value, index) => {
        if ((value % 2) === 1) {
          // Par
          return true;
        } else {
          // Impar
          return false;
        }
      })
    );
  }
}
