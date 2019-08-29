import * as React from 'react';
import { Sentry } from 'react-native-sentry';
import {
    Image,
    ActivityIndicator,
    InteractionManager,
    SafeAreaView,
    ImageStyle
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { VideoScreen } from './VideoScreen';
import { styles } from './style';
import {
    Balthazar,
    LKVideoMap,
    BalthazarState,
    initialState
} from '../../balthazar';


type Props = {
    videoMap: LKVideoMap;
    token: string;
    timestamp: string;
    clientID: string;
} & NavigationScreenProps;

type State = {
    isReady: boolean;
};
export class VideoView extends React.Component<NavigationScreenProps, State> {
    _isMounted = false;

    state = {
        isReady: false
    }

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this._isMounted = true;
        InteractionManager.runAfterInteractions(() => {
            if (this._isMounted === false) return;
            return this.setState({
                isReady: true
            });
        });
    }

    componentDidCatch(error, errorInfo) {
        Sentry.captureException(error);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getProperties = () => {
        const { token, videoMap, timestamp, clientID } = Balthazar.state;
        return { token, videoMap, timestamp, clientID };
    }

    render() {
        const {
            navigation
        } = this.props;
        const {
            videoMap,
            token,
            timestamp,
            clientID,
        } = this.getProperties();

        const videoID = navigation.getParam('videoID', null);
        const video = videoMap ? videoMap[videoID] : undefined;

        const {
            isReady
        } = this.state;
        if (isReady === false || video === undefined) {

            return (
                <SafeAreaView style={{
                    flex: 1,
                    backgroundColor: '#080808'
                }}>
                    {video
                        ? <Image
                            blurRadius={1}
                            style={styles.backgroundImage as ImageStyle}
                            source={{ uri: video.thumbnail_url }} />
                        : null}
                    <ActivityIndicator
                        size="large"
                        color={'#F44336'}
                        style={styles.loading} />
                </SafeAreaView>
            );
        }
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#000'
            }}>
                <VideoScreen
                    navigation={this.props.navigation}
                    comments={[]}
                    video={video}
                    token={token}
                    timestamp={timestamp}
                    clientID={clientID} />
            </SafeAreaView>
        );
    }
}



// export function VideoView(props: NavigationScreenProps) {
//     return (<VideoViewComponent
//         {...props}
//         videoMap={Balthazar.state.videoMap}
//         token={Balthazar.state.token}
//         timestamp={Balthazar.state.timestamp}
//         clientID={Balthazar.state.clientID}
//     />);
// }

// export class VideoView extends React.Component<NavigationScreenProps, BalthazarState>{
//     state = Balthazar.state;
//     componentDidMount() {
//         Balthazar.onMount(this);
//     }

//     componentWillUnmount() {
//         this.setState(initialState);
//         Balthazar.onUnmount(this);
//     }

//     getProperties = () => {
//         const { token, videoMap, timestamp, clientID } = this.state;
//         return { token, videoMap, timestamp, clientID };
//     }

//     getDispatch = () => {
//         //const { } = Balthazar;
//         return {};
//     }

//     render() {
//         return (
//             <VideoViewComponent
//                 {...this.props}
//                 {...this.getProperties()}
//                 {...this.getDispatch()}
//             />);
//     }
// }