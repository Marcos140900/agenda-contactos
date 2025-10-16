import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private _snackBar = inject(MatSnackBar);

  openSnackbar(message:string,action:string = "",duration: number = 2500){
    this._snackBar.open(message,action,{duration});
  }
  
  openSnackbarError(message:string){
    this.openSnackbar(message, "⚠️");
  }

  openSnackbarSuccess(message:string){
    this.openSnackbar(message,"🎉");
  }

}
