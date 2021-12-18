import { Alert } from "react-native";

export function firebaseErrorHandler(error: any) {
    if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
    } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('We have blocked all requests from this device due to unusual activity. Try again later');
    } else if (error.code === 'auth/user-not-found') {
        Alert.alert('User not found');
    } else if (String(error).startsWith("Error: RNGoogleSignInError: The user canceled the sign in request.")) {
        //console.log("Usuário cancelou login com  Google");
    } else {
        console.log(error);
        Alert.alert(String(error));
    }
}