import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  constructor(private fb: FormBuilder){}

  /*public myForm2 = new FormGroup({
    favoriteGames: new FormArray([])
  });*/

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  onSubmit():void{

    if(this.myForm.valid){
      console.log(this.myForm.value);
      console.log(this.myForm.valid);
      this.myForm.markAllAsTouched();
      (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
      this.newFavorite.reset();
      return;
    }
    console.log(this.myForm.value);
    console.log(this.myForm.valid);
    return;

  }

  isValidField(field:string):boolean|null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field:string):string | null {
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for(const key of Object.keys(errors)){  
      switch(key){
        case'required': 
          return 'Este campo es obligatorio';
        case'minlength': 
          return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

  onDeleteFavorite(index: number):void{
    this.favoriteGames.removeAt(index);
  }

  onAddToFavorites():void{
    if(this.newFavorite.invalid) return;

    console.log(this.newFavorite.value);
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control(newGame,Validators.required)
    );
  }


  isValidFieldInArray(formArray: FormArray, index:number){
    return formArray.controls[index].errors && formArray.controls[index].touched;
  };

}
