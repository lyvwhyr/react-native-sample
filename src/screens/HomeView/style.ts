import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const regularFont = Platform.OS === 'ios' ? 'Nunito Sans' : 'NunitoSans-Medium';
const lightFont = Platform.OS === 'ios' ? 'Nunito Sans' : 'NunitoSans-Light';
const boldFont = Platform.OS === 'ios' ? 'Nunito Sans' : 'NunitoSans-Black';
const extraBold = Platform.OS === 'ios' ? 'Nunito Sans' : 'NunitoSans-ExtraBold';

const { height, width } = Dimensions.get('screen');

const header = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#080808',
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        marginTop: 0,
    },
    logo: {
        height: 50,
        width: 50,
    },
    loading: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        zIndex: 2,
        position: 'absolute',
        color: '#f44336',
        width,
        height,
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#080808',
    },
    scrollView: {
        marginTop: 0,
    },
    title: {
        flex: 1,
        fontSize: 18,
        textAlign: 'left',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 20,
        color: '#fff',
        fontFamily: boldFont,
        fontWeight: '700',
    }
});

const loadingScreen = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#080808',
    },
    loader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        zIndex: 2,
        position: 'absolute',
        color: '#f44336',
        width,
        height,
    },
});

const featureCard = StyleSheet.create({
    container: {
        flex: 1,
        height: 300,
        marginTop: 20,
        marginBottom: 30,
        marginLeft: 15,
        overflow: 'hidden',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        borderBottomColor: '#222222',
        borderBottomWidth: 1
    },
    background: {
        flex: 1,
        width,
        height: 300,
        resizeMode: 'cover',
    },
    title: {
        top: 20,
        left: 30,
        fontSize: 25,
        height: 'auto',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'left',
        color: '#212121',
        backgroundColor: '#fff',
        fontFamily: boldFont,
        fontWeight: '700',
        position: 'absolute'
    },
    subtitle: {
        bottom: 20,
        right: 30,
        fontSize: 18,
        height: 'auto',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'right',
        color: '#212121',
        backgroundColor: '#fff',
        fontFamily: boldFont,
        fontWeight: '700',
        position: 'absolute',
    },
});

const cardView = StyleSheet.create({
    container: {
        flex: 1,
        height: 300,
        marginTop: 20,
        marginBottom: 30,
        overflow: 'hidden',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        borderBottomColor: '#222222',
        borderBottomWidth: 1
    },
    background: {
        flex: 1,
        width,
        height: 300,
        resizeMode: 'cover',
        position: 'absolute',
    },
    content: {
        height: 100,
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#1d1d1d',
        paddingTop: 30,
        paddingBottom: 0,
        paddingLeft: 80,
    },
    contentProfileImg: {
        width: 40,
        height: 40,
        borderRadius: 99,
        position: 'absolute',
        left: 20,
        top: 30,
    },
    contentTitle: {
        flex: 1,
        fontSize: 18,
        height: 18,
        lineHeight: 18,
        textAlign: 'left',
        color: '#fff',
        fontFamily: extraBold,
        fontWeight: '900',
        marginBottom: 0,
    },
    underline: {
        height: 1,
        width: 50,
        backgroundColor: '#f44336',
        marginBottom: 8,
    },
    contentSubTitle: {
        flex: 1,
        fontSize: 14,
        textAlign: 'left',
        marginBottom: 20,
        color: '#AEAEAE',
        fontFamily: regularFont,
    }
});

export {
    styles,
    header,
    cardView,
    featureCard,
    loadingScreen,
};