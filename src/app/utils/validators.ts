import { AbstractControl } from '@angular/forms'

export class CustomValidators{

    static maximumLength(control: AbstractControl){
        const value = String(control.value);

        if(value.length > 250){    
            return { maximumLength: true };
        }
        return null;
    }

    static isIdValid(control: AbstractControl){    
        const value = control.value ? String(control.value) : '';
    
            if(value && (value.length < 5 || value.length > 250)){
                return { isIdValid: true };
            }
    
        return null;
    }
}