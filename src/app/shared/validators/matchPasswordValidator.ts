import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const password1: string = typeof control.get('password')?.value;
    const password2: string = typeof control.get('confirmPassword')?.value;
    return password1 === password2 ? null : { mismatchPassword: true };
  };
}
