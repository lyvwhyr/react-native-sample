import * as React from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Video from 'react-native-af-video-player';

const { height, width } = Dimensions.get('screen');
const videoHeight = width * 0.56;

const styles = StyleSheet.create({
    backgroundVideo: {
        backgroundColor: '#000',
        width,
        height: videoHeight,
        zIndex: 2,
    },
});
// Password
// liveKanvas888
// Alias
// LiveKanvasAli

const videoPlayerTheme = {
    //title: '#FFF',
    //more: '#446984',
    //center: '#7B8F99',
    //fullscreen: '#446984',
    //volume: '#A5957B',
    //scrubberThumb: '#234458',
    scrubberBar: '#f44336',
    //seconds: '#DBD5C7',
    //duration: '#DBD5C7',
    progress: '#f44336',
    loading: '#f44336',
};

const logoUrl = 'https://storage.googleapis.com/lkstatic/livekanvas-logo.png';

type Props = {
    url: string;
    title: string;
    posterImg: string;
    onFullScreen: (value: boolean) => void;
};
export function VideoComponent(props: Props) {
    return <Video
        url={props.url}
        title={props.title}
        style={styles.backgroundVideo}
        placeholder={props.posterImg}
        logo={logoUrl}
        rotateToFullScreen
        resizeMode={'contain'}
        autoPlay={true}
        theme={videoPlayerTheme}
        onFullScreen={props.onFullScreen} />;
}
