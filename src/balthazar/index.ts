import { Sentry } from 'react-native-sentry';
import { merge } from 'lodash';
import { ComponentState, Component } from 'react';
import {
    LKEvent,
    LKEventMap,
    LKVideo,
    LKVideoMap,
} from './models';


const baseUrl = 'http://livekanvas-221517.appspot.com/';
// const baseUrl = 'http://192.168.1.16:8080/';

type HomeViewCard = {
    displayTitle: string;
    shows: LKEvent[];
};

export type HomeView = {
    'recent': HomeViewCard,
    'faith': HomeViewCard,
    'comedy': HomeViewCard,
    'talk': HomeViewCard,
    'fitness': HomeViewCard,
    'sports': HomeViewCard,
    'ppv': HomeViewCard;
};

export type BalthazarState = {
    clientID: string;
    ready: boolean;
    token: string;
    timestamp: string;
    shows: LKEvent[];
    showMap: LKEventMap;
    videos: LKVideo[];
    videoMap: LKVideoMap;
    homeView: HomeView;
    mountedStates: { [index: string]: Component };
};

const homeViewDefaultState: HomeView = {
    'recent': {
        displayTitle: 'New Releases',
        shows: [],
    },
    'faith': {
        displayTitle: 'Faith and Belief',
        shows: [],
    },
    'comedy': {
        displayTitle: 'Comedy',
        shows: [],
    },
    'talk': {
        displayTitle: 'Talk',
        shows: [],
    },
    'fitness': {
        displayTitle: 'Health and Fitness',
        shows: [],
    },
    'sports': {
        displayTitle: 'Sports',
        shows: [],
    },
    'ppv': {
        displayTitle: 'PPV',
        shows: [],
    }
};


function uniq(a, b) {
    const k = a.concat(b);
    return [...new Set(k)];
}

function makeId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}


export const initialState = {
    clientID: '9231',
    ready: false,
    token: '',
    timestamp: '',
    shows: [],
    showMap: {},
    videos: [],
    videoMap: {},
    homeView: Object.assign({}, homeViewDefaultState),
    mountedStates: {},
};


class Balthazar {
    readonly state: BalthazarState = merge({}, initialState);

    constructor() {
        this.getToken();
    }
    onMount = (screen: Component) => {
        const id = makeId();
        this.state.mountedStates[id] = screen;
        screen.setState({ stateID: id });
    };

    onUnmount = (screen: Component) => {
        delete this.state.mountedStates[screen.state['stateID']];
    };

    getState = () => {
        return this.state;
    };

    setState = (partialState: any) => {
        //console.log('previous state', this.state);
        const newState = merge(
            this.state,
            partialState,
        );
    };

    getToken = async () => {
        let token = '';
        let timestamp = '';
        try {
            const response = await fetch(`${baseUrl}token`);
            const json = await response.json();
            token = json.token;
            timestamp = json.timestamp;
            // as it expires every 5 minutes
            setTimeout(this.getToken, 180000);
        } catch (e) {
            //console.error(e);
            Sentry.captureException(e);
        }
        this.setState({
            token,
            timestamp
        });
    };

    getHomeView = async () => {
        let homeView: HomeView = Object.assign({}, homeViewDefaultState);
        try {
            const response = await fetch(`${baseUrl}view/home`);
            homeView = await response.json();
        } catch (e) {
            //console.error(e);
            Sentry.captureException(e);
        }
        this.setState({ homeView });
        return homeView;
    };

    getAllVideos = async () => {
        const videoMap: LKVideoMap = {};
        let videos: LKVideo[] = [];
        try {
            const response = await fetch(`${baseUrl}allVideos`);
            const json: LKVideo[] = await response.json();
            json.forEach(video => {
                videoMap[video.id] = video;
            });
            videos = json;
        } catch (e) {
            //console.error(e);
            Sentry.captureException(e);
        }
        // merge and deduplicate with previous state
        const newVideoMap = Object.assign({}, this.state.videoMap, videoMap);
        const newVideos: LKVideo[] = Object.keys(newVideoMap)
            .map(key => newVideoMap[key])
            .sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });

        this.setState({
            videos: newVideos,
            videoMap: newVideoMap
        });
    };

    getEventView = async (eventID: string) => {
        let show: LKEvent;
        const showMap: LKEventMap = {};
        const videoMap: LKVideoMap = {};
        let videos: LKVideo[] = [];
        let json = {};
        try {
            const response = await fetch(`${baseUrl}view/show?eventID=${eventID}`);
            json = await response.json();
            show = json.event;
            // set up data as hash map for faster retrieval
            showMap[show.id] = show;

            // setup hash map for videos passed over as well
            videos = json.videos as LKVideo[];

            videos.forEach(v => {
                videoMap[v.id] = v;
            });
        } catch (e) {
            //console.error(e);
            Sentry.captureException(e);
        }
        // merge and de-duplicate
        const newShowMap = Object.assign({}, this.state.showMap, showMap);
        const newShows = Object.keys(newShowMap).map(key => newShowMap[key]);
        const newVideoMap = Object.assign({}, this.state.videoMap, videoMap);
        const newVideos = Object.keys(newVideoMap)
            .map(key => newVideoMap[key])
            .sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });

        this.setState({
            shows: newShows,
            showMap: newShowMap,
            videos: newVideos,
            videoMap: newVideoMap
        });
        return json;
    };

    refreshDB = async () => {
        await fetch(`${baseUrl}events`);
    };



}

const balthazarInstance = new Balthazar();
export { Balthazar as BalthazarClass };
export { balthazarInstance as Balthazar };
export * from './models';