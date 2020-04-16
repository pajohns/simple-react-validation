import { useState, useCallback, useEffect } from 'react';
import { validationRegex } from './constants';

export class Validation {
    validationMessages: string[] = [];
    stringToTest: string = '';
    errors: { [fieldName: string]: string | undefined} = {};

    for(value: string): Validation {
        this.stringToTest = value;
        this.validationMessages = [];
        return this;
    }

    required(message?: string): Validation {
        if (!this.stringToTest || this.stringToTest.length <= 0) {
            this.validationMessages.push(message ? message : 'This field is required');
        }

        return this;
    }

    minimumLength(minLength: number, message?: string): Validation {
        if (!this.stringToTest || this.stringToTest.length < minLength) {
            this.validationMessages.push(message ? message : `Minimum length is ${minLength}.`);
        }

        return this;
    }

    validEmail(message?: string): Validation {
        if (!validationRegex.email.test(this.stringToTest)) {
            this.validationMessages.push(message ? message : 'The email address is improperly formatted.');
        }

        return this;
    }

    appendErrors(fieldName: string) {
        if (this.validationMessages.length > 0) {
            this.errors = {
                ...this.errors,
                [fieldName]: this.validationMessages.join(' '),
            }
            this.validationMessages = [];
        }
        return this;
    }

    finalResult() {
        const finalResult = {...this.errors};
        this.errors = {};
        return finalResult;
    }
}

export const useValidation = () => {
    const [validator] = useState<Validation>(new Validation());
    const [errors, setErrorsState] = useState<{ [fieldName: string]: string | undefined}>({});
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setIsValid(Object.keys(errors).length > 0);
    }, [errors])

    const setErrors = useCallback((errors: { [fieldName: string]: string | undefined}) => {
        setErrorsState(errors);
    }, []);

    const isFieldValid = (fieldName: string): boolean => {
        return errors[fieldName] !== undefined;
    }

    const getFieldErrors = (fieldName: string): string | undefined => {
        return errors[fieldName];
    }

    return {
        validator,
        setErrors,
        isFieldValid,
        getFieldErrors,
        isValid
    }
}