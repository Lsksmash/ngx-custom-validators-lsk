import { Directive, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { equalTo } from './validator';

const EQUAL_TO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EqualToValidator),
  multi: true
};

@Directive({
  selector: '[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]',
  providers: [EQUAL_TO_VALIDATOR]
})
export class EqualToValidator implements Validator, OnInit {
  @Input() equalTo: FormControl | undefined;

  private validator: ValidatorFn | undefined;

  ngOnInit() {
    this.validator = equalTo(this.equalTo!);
  }

  validate(c: AbstractControl): {[key: string]: any}|null {
    return this.validator ? this.validator(c) : null;
  }
}
