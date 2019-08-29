import * as React from 'react';
import {
    Text,
    Image,
    TouchableHighlight,
    ImageStyle,
} from 'react-native';

import { featureCard } from '../style';

type Props = {
    videoID: string;
    title: string;
    subtitle: string;
    posterImg: string;
    onItemPress: (videoID: string) => void;
};
export class FeatureCard extends React.Component<Props, {}> {

    render() {
        const {
            title,
            videoID,
            subtitle,
            posterImg,
            onItemPress,
        } = this.props;
        return (
            <TouchableHighlight
                key={videoID}
                onPress={() => {
                    onItemPress(videoID);
                }}
                style={featureCard.container}>
                <React.Fragment>
                    <Image
                        style={featureCard.background as ImageStyle}
                        source={{ uri: posterImg }} />
                    {(!title) ? null : <Text style={featureCard.title}>{title}</Text>}
                    <Text style={featureCard.subtitle}>{subtitle}</Text>
                </React.Fragment>
            </TouchableHighlight>
        );
    }
}
