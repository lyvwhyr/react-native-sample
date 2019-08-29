import {
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

const regularFont = Platform.OS === 'ios' ? 'Nunito Sans' : 'NunitoSans-Medium';
const lightFont = Platform.OS === 'ios' ? 'Nunito Sans' : 'NunitoSans-Light';
const boldFont = Platform.OS === 'ios' ? 'Nunito Sans' : 'NunitoSans-Black';
const extraBoldFont = Platform.OS === 'ios' ? 'Nunito Sans' : 'NunitoSans-ExtraBold';


const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
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
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#080808',
        paddingTop: 0
    },
    commentView: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#222',
        borderBottomWidth: 1
    },
    commentCount: {
        fontSize: 14,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        color: '#ffffff'
    },
    commentProfilePic: {
        width: 30,
        height: 30,
        borderRadius: 99,
    },

    userCommentContainer: {
        flexDirection: 'column',
        marginLeft: 20,
        marginBottom: 15
    },
    commentUserName: {
        fontSize: 10,
        color: '#aeaeae',
        paddingBottom: 8
    },
    commentDisplay: {
        fontSize: 14,
        color: '#ffffff'
    },

    commentText: {
        marginLeft: 20,
        flex: 1,
        color: '#ffffff'
    },
    videoMeta: {
        flex: 1
    },
    videoDataContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
        height: 'auto',
        borderBottomColor: '#424242',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 25,
        textAlign: 'left',
        marginBottom: 5,
        marginTop: 20,
        color: '#fff',
        fontFamily: extraBoldFont,
        fontWeight: '900'
    },
    viewCount: {
        fontSize: 12,
        textAlign: 'left',
        color: '#aeaeae',
        marginBottom: 20,
    },
    description: {
        fontSize: 12,
        textAlign: 'left',
        color: '#fff',
        marginBottom: 25,
    },
    navigationBar: {
        height: 60,
        width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    }
});



export { styles };