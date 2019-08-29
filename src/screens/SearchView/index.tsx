import * as React from 'react';
import {
    InteractionManager,
    ActivityIndicator,
    SafeAreaView,
    Image,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { styles } from './style';

export class SearchView extends React.Component<NavigationScreenProps> {

    state = {
        isReady: false
    };
    constructor(props: NavigationScreenProps) {
        super(props);
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                isReady: true
            });
        });
    }

    render() {
        if (!this.state.isReady) {
            return (
                <React.Fragment>
                    <ActivityIndicator
                        size="large"
                        style={styles.loading} />
                </React.Fragment>

            );
        }
        return (
            <SafeAreaView style={styles.safeArea}>

            </SafeAreaView>
        );
    }
}