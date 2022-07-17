import {
    signInWithGooglePopup,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import Button from '../../components/button/button.component';

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user }   = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h2>Sign In Page</h2>
            <Button buttonType="google"
                onClick={logGoogleUser}>
                Sign in with Google Popup
            </Button>
            <SignUpForm />
        </div>
    )
}

export default SignIn
