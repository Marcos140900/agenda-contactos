import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadList = signal<string[]>([])

  loading = computed<boolean>(()=> this.loadList().length ? true : false)
  
  addLoad(tipoCarga:string){
    if(this.loadList().includes(tipoCarga)) return;
    this.loadList.set([...this.loadList(),tipoCarga]);
  }

  deleteLoad(tipoCarga:string){
    this.loadList.set(this.loadList().filter(item => item !== tipoCarga));
  }

}
