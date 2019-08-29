import React from 'react';
import { Sentry } from 'react-native-sentry';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    ActivityIndicator,
    InteractionManager,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import {
    Button
} from 'react-native-paper';
import { Subscribe } from 'unstated';
import { NavigationScreenProps } from 'react-navigation';
import {
    Balthazar,
    LKVideo,
    LKEventMap,
    initialState,
    BalthazarState
} from '../../balthazar';
import {
    loading,
    styles,
    show
} from './style';
import { number } from 'prop-types';

type Props = {
    videos: LKVideo[];
    showMap: LKEventMap;
    getEventView: Function;
} & NavigationScreenProps;

type State = {
    isReady: boolean;
};

export class ShowListView extends React.Component<NavigationScreenProps, State> {
    _isMounted = false;

    constructor(props: Props) {
        super(props);

        this.state = {
            isReady: false,
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        InteractionManager.runAfterInteractions(() => {
            if (this._isMounted === false) return;
            this.setState({
                isReady: true
            });
        });
        const {
            navigation
        } = this.props;
        const eventID = navigation.getParam('eventID', undefined);
        await Balthazar.getEventView(eventID);
        this.setState(this.state);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidCatch(error, errorInfo) {
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    getProperties = () => {
        const { videos, showMap } = Balthazar.state;
        return { videos, showMap };
    }

    navigateToVideo = (videoID: number) => {
        const { navigation } = this.props;
        const strVideoID = String(videoID);
        navigation.navigate('Video', {
            videoID: strVideoID
        });
    }

    getEpisodeList = () => {
        const {
            navigation,
        } = this.props;

        const {
            videos
        } = this.getProperties();
        if (!navigation
            || !videos
            || videos.length < 1) {
            return null;
        }
        // .log('videos', videos);
        // video is string needs to be casted as int
        //   hence the "+" symbol
        const eventID = +navigation.getParam('eventID', undefined);
        const episodes = videos.filter((vid) => {
            return vid.event_id === eventID;
        });
        // console.log('episodes', episodes);
        return episodes.map((v) => {
            return (
                <TouchableHighlight
                    onPress={() => this.navigateToVideo(v.id)}
                    style={{
                        height: 80,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: 14,
                        borderTopColor: '#424242',
                        borderTopWidth: 1,
                        overflow: 'hidden'
                    }}
                    key={v.id}>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <Image
                            style={{
                                width: 100,
                                height: 50,
                                resizeMode: 'cover'
                            }}
                            source={{ uri: v.thumbnail_url }} />
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                            }}>
                            <Text
                                style={{
                                    color: '#ffffff',
                                    paddingLeft: 8,
                                    fontSize: 12
                                }}>{v.caption}</Text>
                            <Text
                                style={{
                                    color: '#babdbe',
                                    paddingLeft: 8,
                                    fontSize: 12
                                }}>{v.description || '-'}</Text>
                        </View>
                    </View>
                </TouchableHighlight>);
        });
    }

    getShowDetails = () => {
        const {
            navigation,
        } = this.props;

        const {
            showMap
        } = this.getProperties();

        if (!navigation
            || !showMap
            || Object(showMap).length < 1) {
            return null;
        }
        const eventID = +navigation.getParam('eventID', undefined);
        if (!eventID) return null;
        if (!showMap[eventID]) {
            return null;
        }
        const activeShow = showMap[eventID];
        // console.log(activeShow);
        // console.log('activeShow', activeShow);
        return (<React.Fragment>


            <Image
                style={{
                    width: null,
                    height: null,
                    flex: 1,
                    resizeMode: 'cover'
                }}
                source={{ uri: activeShow.logo_url }} />
            <Text
                style={{
                    paddingTop: 20,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    fontSize: 20,
                    fontWeight: '900',
                    color: '#ffffff'
                }}
            >{activeShow.full_name}</Text>
            <Text
                style={{
                    paddingTop: 8,
                    paddingBottom: 20,
                    paddingLeft: 8,
                    fontSize: 14,
                    color: '#babdbe'
                }}
            >{activeShow.description || '-'}</Text>
        </React.Fragment>);
    }

    render() {
        const {
            navigation
        } = this.props;

        const {
            videos
        } = this.getProperties();

        const {
            isReady
        } = this.state;

        if (isReady === false) {
            return (<SafeAreaView style={{
                flex: 1,
                backgroundColor: '#080808'
            }}>
                <ActivityIndicator
                    size="large"
                    color={'#F44336'}
                    style={loading.loader} />
            </SafeAreaView>);
        }

        return (
            <SafeAreaView style={styles.safeView} >
                <View style={styles.navigationBar}>
                    <Button
                        color={'#ffffff'}
                        icon="keyboard-arrow-left"
                        onPress={() => navigation.goBack()}
                    >BACK</Button>
                </View>
                <ScrollView style={{ paddingBottom: 20 }}>
                    <View style={show.container}>
                        {this.getShowDetails()}
                    </View>
                    {this.getEpisodeList()}
                </ScrollView>
            </SafeAreaView >);
    }

}

// export function ShowListView(props) {
//     return (
//         <ShowListViewComponent
//             {...props}
//             videos={Balthazar.state.videos}
//             showMap={Balthazar.state.showMap}
//             getEventView={Balthazar.getEventView}
//         />);
// }


// export class ShowListView extends React.Component<NavigationScreenProps, BalthazarState>{
//     state = Balthazar.state;
//     componentDidMount() {
//         Balthazar.onMount(this);
//     }

//     componentWillUnmount() {
//         this.setState(initialState);
//         Balthazar.onUnmount(this);
//     }

//     getProperties = () => {
//         const { videos, showMap } = this.state;
//         return { videos, showMap };
//     }

//     getDispatch = () => {
//         const { getEventView } = Balthazar;
//         return { getEventView };
//     }

//     render() {
//         return (
//             <ShowListViewComponent
//                 {...this.props}
//                 {...this.getProperties()}
//                 {...this.getDispatch()}
//             />);
//     }
// }