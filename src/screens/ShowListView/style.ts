import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('screen');

const loading = StyleSheet.create({
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
        height
    },
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
    navigationBar: {
        height: 60,
        width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    safeView: {
        flex: 1,
        backgroundColor: '#080808'
    }
});

const show = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#080808',
        width,
        height: 250
    }
});

export {
    loading,
    styles,
    show
};
