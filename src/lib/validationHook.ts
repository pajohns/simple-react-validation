import { useCallback, useEffect, useState } from "react";
import { Validator } from "./validator";

export interface IUseValidationType {
    validator: Validator;
    setErrors: (errors: { [fieldName: string]: string | undefined}) => void;
    isFieldValid: (fieldName: string) => boolean;
    getFieldErrors: (fieldName: string) => string | undefined;
    isValid: boolean;
}


export const useValidation = (): IUseValidationType => {
    const [validator] = useState<Validator>(new Validator());
    const [errors, setErrorsState] = useState<{ [fieldName: string]: string | undefined}>({});
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setIsValid(Object.keys(errors).length === 0);
    }, [errors]);

    const setErrors = useCallback((newErrors: { [fieldName: string]: string | undefined}) => {
        setErrorsState(newErrors);
    }, []);

    const isFieldValid = (fieldName: string): boolean => {
        return errors[fieldName] !== undefined;
    };

    const getFieldErrors = (fieldName: string): string | undefined => {
        return errors[fieldName];
    };

    return {
        getFieldErrors,
        isFieldValid,
        isValid,
        setErrors,
        validator,
    };
};
