import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const password1: string = control.parent?.get('password')?.value as string;
    const password2 = control.parent?.get('confirmPassword')?.value as string;
    return password1 === password2 ? null : { mismatchPassword: true };
  };
}
