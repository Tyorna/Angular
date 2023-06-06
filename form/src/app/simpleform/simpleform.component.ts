import { Component, OnInit } from '@angular/core';
  import {FormBuilder, FormControl, FormGroup, Validators, FormArray,} from '@angular/forms';
  @Component({
  selector: 'app-simpleform',
  templateUrl: './simpleform.component.html',
  styleUrls: ['./simpleform.component.scss']
})
  export class SimpleformComponent implements OnInit {

      contenitoreForm!: FormGroup;

      constructor(private fb: FormBuilder) {}

      ngOnInit(): void {
          };

      getErrorsC(name: string, error: string) {
          return this.contenitoreForm.get(name)?.errors![error];
      }

      getFormC(name: string) {
          return this.contenitoreForm.get(name);
      }

      getPowers() {
          return (this.contenitoreForm.get('powers') as FormArray).controls;
      }

      addPower() {
          const control = this.fb.control(null);
          (this.contenitoreForm.get('sports') as FormArray).push(control);
          console.log(this.getPowers());
      }

      submitForm() {
          console.log(this.contenitoreForm);
          console.log('Form correttamente inviato');
          this.contenitoreForm.reset();
      }
  }
