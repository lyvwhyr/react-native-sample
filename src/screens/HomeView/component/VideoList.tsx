import * as React from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
} from 'react-native';
import moment from 'moment';
import { LKVideoMap } from '../../../balthazar';

type Props = {
    videos: LKVideoMap,
    onVideoPress: (videoID: string) => void;
};
import { cardView } from '../style';

export class VideoList extends React.Component<Props, {}>{


    render() {
        const {
            videos,
            onVideoPress,
        } = this.props;
        return (

            Object.keys(videos).map((k) => (
                <TouchableHighlight
                    key={k}
                    onPress={() => {
                        onVideoPress(k);
                    }}
                    style={cardView.container}>
                    <React.Fragment>
                        <Image
                            style={cardView.background}
                            source={{ uri: videos[k].thumbnailUrl }} />
                        <View style={cardView.content}>
                            <Image
                                style={cardView.contentProfileImg}
                                source={{ uri: videos[k].thumbnailUrl }} />
                            <Text style={cardView.contentTitle}>{videos[k].caption}</Text>
                            <View style={cardView.underline}></View>
                            <Text style={cardView.contentSubTitle}>
                                {videos[k].publishAt
                                    ? moment(videos[k].publishAt).fromNow()
                                    : ''}
                            </Text>
                        </View>
                    </React.Fragment>
                </TouchableHighlight>))
        );
    }
}