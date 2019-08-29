import * as React from 'react';
import {
    View,
    Image,
    Text,
    ImageStyle
} from 'react-native';
import moment from 'moment';
import { styles } from '../style';

type Props = {
    userProfileImg: string;
    userName: string;
    commentDate: string;
    commentContent: string;
};

export function VideoUserComment(props: Props) {
    return (
        <View style={styles.commentView} >
            <Image
                style={styles.commentProfilePic as ImageStyle}
                source={{ uri: props.userProfileImg }}
            />
            <View style={styles.userCommentContainer}>
                <Text style={styles.commentUserName}>`${props.userName}  &#x25CF; ${moment(props.commentDate).fromNow()}`</Text>
                <Text>{props.commentContent}</Text>
            </View>
        </View >);
}