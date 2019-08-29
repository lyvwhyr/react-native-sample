import * as React from 'react';

import {
    View,
    Text,
    Image,
    FlatList,
    TouchableHighlight,
} from 'react-native';

import {
    LKEvent, LKVideo
} from '../../../balthazar';
import { List } from 'react-native-paper';

type Props = {
    shows: LKEvent[] | LKVideo[],
    onItemPress: (itemID: string) => void;
};


export class HorizontalCards extends React.Component<Props> {


    renderItem = ({ item }) => {
        return (<TouchableHighlight
            style={{
                width: 300,
                height: 250,
                marginLeft: 20,
            }}
            underlayColor="#080808"
            onPress={() => {
                this.props.onItemPress(String(item.id));
            }}>
            <React.Fragment>
                <View
                    style={{
                        flex: 2
                    }}>
                    <Image
                        style={{
                            width: null,
                            height: null,
                            flex: 1,
                            resizeMode: 'cover'
                        }}
                        source={{ uri: (item.logo_url || item.thumbnail_url) }} />
                </View>
                <View
                    style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        flex: 1
                    }}>
                    <Text
                        style={{ color: '#ffffff' }}> {item.full_name || item.caption}</Text>
                </View>
            </React.Fragment>
        </TouchableHighlight>);
    };

    render() {
        const {
            shows
        } = this.props;

        return (
            <FlatList style={{ height: 200, marginTop: 20 }}
                data={shows}
                keyExtractor={item => String(item.id)}
                renderItem={this.renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false} />);
    }
}