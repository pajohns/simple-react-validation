# Simple React Validation
An easy to use validator plugin for React allowing for easy usage.

### Usage example
```jsx
import { useValidation } from "simple-react-validation";
export default function LoginPage() {
    const { validator, getFieldErrors, setErrors, isValid } = useValidation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showValidation, setShowValidation] = useState(false);

    const validate = useCallback((): boolean => {
        const errors = validator
            .for(username)
                .validEmail()
                .appendErrors('username')
            .for(password)
                .minimumLength(8)
                .appendErrors('password')
            .finalResult();

        setErrors(errors);

        return Object.keys(errors).length > 0;
    }, [username, password, setErrors, validator]);

    useEffect(() => {
        if (showValidation) {
            validate();
        }
    }, [username, password, validate, showValidation]);

    const performLogin = () => {
        setShowValidation(true); 
        const hasValidationErrors = validate();

        if (hasValidationErrors) {
            return;
        }
        
        // Perform login
    }

    <input type="text" value={username}>
    <p>{getFieldErrors('username')}

    <input type="password" value={password}>
    <p>{getFieldErrors('password')}
}
```