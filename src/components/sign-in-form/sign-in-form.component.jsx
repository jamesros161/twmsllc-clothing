import { useState } from 'react';

import { signInWithEmail, signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState( defaultFormFields );
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields( defaultFormFields );
    }

    const logGoogleUser = async () => {
        console.log( 'logGoogleUser' );
        const { user }   = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInWithEmail( email, password );
            const userDocRef = createUserDocumentFromAuth(user);
            resetFormFields();
        } catch (error) {
            alert('Invalid Username or Password' );
            console.error( 'error creating user', error.message );
            resetFormFields();
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields( {...formFields, [name]: value } );
    };

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className="submit-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={logGoogleUser}>Sign In with Google</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;