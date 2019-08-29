import * as React from 'react';
import {
    View,
    Image,
    SafeAreaView
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
    LoginButton,
    AccessToken,
    LoginResult
} from 'react-native-fbsdk';
import {
    Button
} from 'react-native-paper';
import { styles } from './style';
import { Balthazar } from '../../balthazar';

type Props = {
} & NavigationScreenProps;
class LoginViewComponent extends React.Component<Props> {
    componentDidMount() {

    }
    onLoginFinished = (error: object, result: LoginResult) => {
        if (error) {
            // console.log('login has error: ' + result.error);
        } else if (result.isCancelled) {
            //  console.log('login is cancelled.');
        } else {
            AccessToken.getCurrentAccessToken().then(
                (data) => {
                    if (data) {
                        // console.log(data.accessToken.toString());
                    }
                    else {
                        // console.log('getCurrentAccessToken returned null');
                    }
                }
            );
        }
    }
    onSkipLogin = () => {
        const { navigation } = this.props;
        navigation.navigate('Home');
    }
    render() {
        const logoUrl = 'https://storage.googleapis.com/lkstatic/livekanvas-logo.png';
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#080                808'
            }} >
                <View style={styles.container}>
                    <Button
                        style={styles.skipButton}
                        mode={'text'}
                        onPress={this.onSkipLogin}>SKIP</Button>
                    <View style={styles.logoContainer}>
                        <Image
                            resizeMethod={'resize'}
                            resizeMode={'contain'}
                            style={styles.logo}
                            source={{ uri: logoUrl }} />
                    </View>
                    <Button
                        onPress={this.onSkipLogin}
                        style={styles.buttonStyle}
                        mode="contained">
                        Sign Up
                </Button>
                    <Button
                        style={styles.buttonStyle}
                        accessibilityLabel={'user login button'}
                        color={'#ffffff'}
                        dark={true}
                        mode="outlined"
                        onPress={this.onSkipLogin}>
                        Login
                </Button>
                    {/* <LoginButton
                    onLoginFinished={this.onLoginFinished}
                    onLogoutFinished={() => console.log("User logged out")} /> */}
                </View>
            </SafeAreaView>);
    }
}

export function LoginView(props: NavigationScreenProps) {
    return (<LoginViewComponent
        {...props} />);
}