import {
    StyleSheet,
    Dimensions,
} from 'react-native';

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
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    }
});


export {
    styles
};