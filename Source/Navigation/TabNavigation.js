import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import HomeRoute from '../Screens/Home';


const MusicRoute = () => <Text>Music</Text>;
// const HomeRoute = () => <Text>Home</Text>;
const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const TabNavigation = () => {
   
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', icon: 'home' },
        { key: 'music', icon: 'heart' },
        { key: 'albums', icon: 'book' },
        { key: 'recents', icon: 'history' },

    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        music: MusicRoute,
        albums: AlbumsRoute,
        recents: RecentsRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default TabNavigation;