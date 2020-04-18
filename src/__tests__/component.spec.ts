import { act, renderHook } from "@testing-library/react-hooks";
import { useValidation } from "..";


test("Valid email address does not have errors.", () => {
    const testString: string = "pajohns@gmail.com";
    const fieldName: string = "username";
    const { result } = renderHook(() => useValidation());

    act(() => {
        result.current.setErrors(result.current.validator
            .for(testString)
                .validEmail()
                .appendErrors(fieldName)
            .finalResult());
    });

    expect(result.current.isValid).toBe(true);
    expect(result.current.getFieldErrors(fieldName)).toBe(undefined);
});

test("Invalid email address has errors.", () => {
    const testString: string = "test";
    const fieldName: string = "username";
    const expectedMessage: string = "Email address is invalid";
    const { result } = renderHook(() => useValidation());

    act(() => {
        result.current.setErrors(result.current.validator
            .for(testString)
                .validEmail(expectedMessage)
                .appendErrors(fieldName)
            .finalResult());
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.getFieldErrors(fieldName)).toBe(expectedMessage);
});

test("Required field is missing.", () => {
    const testString: string = "";
    const fieldName: string = "username";
    const expectedMessage: string = "Field is required";
    const { result } = renderHook(() => useValidation());

    act(() => {
        result.current.setErrors(result.current.validator
            .for(testString)
                .required(expectedMessage)
                .appendErrors(fieldName)
            .finalResult());
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.getFieldErrors(fieldName)).toBe(expectedMessage);
});

test("Field is below minimumlength.", () => {
    const testString: string = "1234";
    const minLength: number = 5;
    const fieldName: string = "username";
    const expectedMessage: string = "Minimum length of 5";
    const { result } = renderHook(() => useValidation());

    act(() => {
        result.current.setErrors(result.current.validator
            .for(testString)
                .minimumLength(minLength, expectedMessage)
                .appendErrors(fieldName)
            .finalResult());
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.getFieldErrors(fieldName)).toBe(expectedMessage);
});
