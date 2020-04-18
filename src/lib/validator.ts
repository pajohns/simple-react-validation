import { validationRegex } from "./constants";

export class Validator {
    validationMessages: string[] = [];
    stringToTest: string = "";
    errors: { [fieldName: string]: string | undefined} = {};

    for(value: string): Validator {
        this.stringToTest = value;
        this.validationMessages = [];
        return this;
    }

    required(message?: string): Validator {
        if (!this.stringToTest || this.stringToTest.length <= 0) {
            this.validationMessages.push(message ? message : "This field is required");
        }

        return this;
    }

    minimumLength(minLength: number, message?: string): Validator {
        if (!this.stringToTest || this.stringToTest.length < minLength) {
            this.validationMessages.push(message ? message : `Minimum length is ${minLength}.`);
        }

        return this;
    }

    validEmail(message?: string): Validator {
        if (!validationRegex.email.test(this.stringToTest)) {
            this.validationMessages.push(message ? message : "The email address is improperly formatted.");
        }

        return this;
    }

    passwordMatches(firstPassword: string, message?: string): Validator {
        if (this.stringToTest !== firstPassword) {
            this.validationMessages.push(message ? message : "Passwords do not match.");
        }

        return this;
    }

    appendErrors(fieldName: string): Validator {
        if (this.validationMessages.length > 0) {
            this.errors = {
                ...this.errors,
                [fieldName]: this.validationMessages.join(" "),
            };
            this.validationMessages = [];
        }
        return this;
    }

    finalResult(): { [fieldName: string]: string | undefined} {
        const finalResult: { [fieldName: string]: string | undefined} = {...this.errors};
        this.errors = {};
        return finalResult;
    }
}
