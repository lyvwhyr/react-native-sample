import {
    StyleSheet,
    Platform,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        backgroundColor: '#080808',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 25,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    buttonStyle: {
        marginBottom: 20,
        padding: 8,
    },
    skipButton: {
        position: 'absolute',
        top: 8,
        right: 15,
    },
    logoContainer: {
        marginBottom: 20,
        height: 400,
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: 140,
        width: 200,
        flex: 1,
    },
});

export {
    styles
};