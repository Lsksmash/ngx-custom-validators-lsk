import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { gte } from './validator';

const GREATER_THAN_EQUAL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => GreaterThanEqualValidator),
  multi: true
};

@Directive({
  selector: '[gte][formControlName],[gte][formControl],[gte][ngModel]',
  providers: [GREATER_THAN_EQUAL_VALIDATOR]
})
export class GreaterThanEqualValidator implements Validator, OnInit, OnChanges {
  @Input() gte: number | undefined;

  private validator: ValidatorFn | undefined;
  private onChange: (() => void) | undefined;

  ngOnInit() {
    this.validator = gte(this.gte!);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'gte') {
        this.validator = gte(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any}|null {
    if (this.validator) {
      return this.validator(c);
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
