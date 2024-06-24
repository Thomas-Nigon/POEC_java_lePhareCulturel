import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
    const isValid = pattern.test(control.value);
    return isValid ? null : { forbiddenPassword: ' invalid password' };
  };
}
