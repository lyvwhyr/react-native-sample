import * as React from 'react';
import { VideoComponent } from './component/VideoContainer';
import {
    LKVideo,
    Balthazar,
} from '../../balthazar';
import {
    ScrollView,
    View,
    Text,
    InteractionManager
} from 'react-native';
import {
    Button
} from 'react-native-paper';
import { NavigationScreenProps } from 'react-navigation';
import { styles } from './style';


// type Props = Balthazar & BalthazarState & NavigationScreenProps;

type Props = {
    video: LKVideo;
    token: string;
    timestamp: string;
    clientID: string;
    comments: string[];
} & NavigationScreenProps;

type State = {
    videoIsFullscreen: boolean;
    isReady: boolean;
    videoUrl: string | undefined;
};
export class VideoScreen extends React.Component<Props, State> {
    _isMounted = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            isReady: false,
            videoIsFullscreen: false,
            videoUrl: undefined
        };
    }


    async componentDidMount() {
        this._isMounted = true;
        InteractionManager.runAfterInteractions(async () => {
            if (this._isMounted === false) return;
            await this.setState({
                isReady: true
            });
            this.getVideoUrl();
        });
        // this.refreshTokenIfInvalid();
    }

    async componentWillUnmount() {
        await this.setState({ videoUrl: undefined, isReady: false });
        this._isMounted = false;
    }


    onFullScreen = (status: boolean) => {
        this.setState({ videoIsFullscreen: status });
    }

    getVideoUrl = () => {
        const { video, timestamp, clientID, token } = this.props;
        if (!video
            || !timestamp
            || !clientID
            || !token) {
            return undefined;
        }
        const videoUrl = `${video.m3u8}?token=${token}&timestamp=${timestamp}&clientId=${clientID}`;
        // console.log('videoUrl', videoUrl);
        this.setState({ videoUrl });
        return videoUrl;
    }


    render() {
        const { video, navigation } = this.props;
        const { videoIsFullscreen, videoUrl } = this.state;
        // console.log('videoUrl', videoUrl);

        return (
            <View
                style={styles.container}>

                {videoIsFullscreen
                    ? null
                    : <View style={styles.navigationBar}>
                        <Button
                            color={'#ffffff'}
                            icon="keyboard-arrow-left"
                            onPress={() => navigation.goBack()}
                        >BACK</Button>
                    </View>}

                {videoUrl
                    ? (<React.Fragment>
                        <VideoComponent
                            url={videoUrl}
                            title={video.caption}
                            posterImg={video.thumbnail_url}
                            onFullScreen={this.onFullScreen}
                        />
                        <ScrollView style={styles.videoMeta}>
                            <View style={styles.videoDataContainer}>
                                <Text style={styles.title}>{video.caption}</Text>
                                <Text style={styles.viewCount}>{`${video.views} views`}</Text>
                                <Text style={styles.description}>{video.description || '-'}</Text>
                            </View>
                            <Text style={styles.commentCount}>Comments have been disabled for this video.</Text>
                        </ScrollView>
                    </React.Fragment>)
                    : null}
            </View>);
    }
}
