import React from 'react';
import { Sentry } from 'react-native-sentry';
import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    InteractionManager,
    ImageStyle,
} from 'react-native';
import {
    Button
} from 'react-native-paper';
import { NavigationScreenProps } from 'react-navigation';
import {
    styles,
    header
} from './style';
import {
    FeatureCard,
    HorizontalCards,
} from './component';
import {
    Balthazar,
    BalthazarState,
    LKVideo,
    HomeView,
    initialState
} from '../../balthazar/';

type State = {
    isReady: boolean,
    error: Error
};

type Props = {
    refreshDB: () => Promise<void>;
    getAllVideos: () => Promise<void>;
    getHomeView: () => Promise<HomeView>;
    videos: LKVideo[];
    homeView: HomeView;
} & NavigationScreenProps;


export class HomeScreen extends React.Component<NavigationScreenProps, State> {
    _isMounted = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            isReady: false,
            error: null
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        InteractionManager.runAfterInteractions(() => {
            if (this._isMounted === false) return;
            this.setState({
                isReady: true,
            });
        });
        await Balthazar.refreshDB();
        await Balthazar.getAllVideos();
        await this.setState(this.state);
        await Balthazar.getHomeView();
        await this.setState(this.state);
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Sentry.captureException(error);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getProperties = () => {
        const { videos, homeView } = Balthazar.state;
        return { videos, homeView };
    }

    getMethods = () => {
        const { getAllVideos, getHomeView, refreshDB } = Balthazar;
        return { getAllVideos, getHomeView, refreshDB };
    }

    headerContainer = () => {
        const logoUrl = 'https://storage.googleapis.com/lkstatic/livekanvas-logo.png';
        return (
            <View style={header.container}>
                <Image
                    style={header.logo as ImageStyle}
                    source={{ uri: logoUrl }} />

                <Button style={{
                    position: 'absolute',
                    top: 20,
                    right: 12
                }}>
                    LOGIN </Button>
            </View>);
    }

    navigateToVideo = (videoID: string) => {
        const { navigation } = this.props;
        navigation.navigate('Video', {
            videoID
        });
    }

    navigateToShow = (eventID: string) => {
        const {
            navigation
        } = this.props;
        navigation.navigate('ShowList', {
            eventID
        });
    }

    getFeatureCard = () => {
        const {
            videos
        } = this.getProperties();
        //console.log('videos', videos);
        if (videos !== undefined && videos.length > 1) {
            return (<FeatureCard
                onItemPress={this.navigateToVideo}
                title={videos[0].caption}
                subtitle="Featured Event"
                videoID={`${videos[0].id}`}
                posterImg={videos[0].thumbnail_url}
            />);
        } else {
            return null;
        }

    }

    render() {
        const {
            homeView
        } = this.getProperties();


        const { navigation } = this.props;

        if (this.state.isReady === false) {
            return (
                <SafeAreaView style={{
                    flex: 1,
                    backgroundColor: '#000'
                }} >
                    <View
                        style={styles.container}>
                        <View style={header.container}>
                            {this.headerContainer()}
                        </View>
                        <ActivityIndicator
                            color={'#F44336'}
                            size="large"
                            style={header.loading} />
                    </View>
                </SafeAreaView>);
        }
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#000'
            }} >
                <View
                    style={styles.container}>
                    {this.headerContainer()}
                    <ScrollView style={styles.scrollView}>

                        {this.getFeatureCard()}

                        <Text style={styles.title}>
                            {`${homeView.recent.displayTitle}`}
                        </Text>
                        <HorizontalCards
                            onItemPress={this.navigateToVideo}
                            shows={homeView.recent.videos} />

                        <Text style={styles.title}>
                            {`${homeView.faith.displayTitle}`}
                        </Text>
                        <HorizontalCards
                            onItemPress={this.navigateToShow}
                            shows={homeView.faith.shows} />

                        <Text style={styles.title}>
                            {`${homeView.comedy.displayTitle}`}
                        </Text>
                        <HorizontalCards
                            onItemPress={this.navigateToShow}
                            shows={homeView.comedy.shows} />

                        <Text style={styles.title}>
                            {`${homeView.talk.displayTitle}`}
                        </Text>
                        <HorizontalCards
                            onItemPress={this.navigateToShow}
                            shows={homeView.talk.shows} />


                        <Text style={styles.title}>
                            {`${homeView.fitness.displayTitle}`}
                        </Text>
                        <HorizontalCards
                            onItemPress={this.navigateToShow}
                            shows={homeView.fitness.shows} />

                        <Text style={styles.title}>
                            {`${homeView.sports.displayTitle}`}
                        </Text>
                        <HorizontalCards
                            onItemPress={this.navigateToShow}
                            shows={homeView.sports.shows} />

                        <Text style={styles.title}>
                            {`${homeView.ppv.displayTitle}`}
                        </Text>
                        <HorizontalCards
                            onItemPress={this.navigateToShow}
                            shows={homeView.ppv.shows} />
                    </ScrollView>
                </View>
            </SafeAreaView>);
    }
}

// export class HomeScreen extends React.Component<NavigationScreenProps, BalthazarState>{
//     state = Balthazar.state;
//     componentDidMount() {
//         Balthazar.onMount(this);
//     }

//     componentWillUnmount() {
//         this.setState(initialState);
//         Balthazar.onUnmount(this);
//     }

//     mapStateToProps = () => {
//         const { videos, homeView } = Balthazar.state;
//         return { videos, homeView };
//     }

//     getDispatch = () => {
//         const { getAllVideos, getHomeView, refreshDB } = Balthazar;
//         return { getAllVideos, getHomeView, refreshDB };
//     }


//     render() {
//         return (
//             <HomeViewComponent
//                 {...this.props}
//                 {...this.mapStateToProps()}
//                 {...this.getDispatch()}
//             />);
//     }
// }