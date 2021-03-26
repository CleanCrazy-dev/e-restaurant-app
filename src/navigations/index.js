import React, { Fragment, useEffect } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { Splash, Home } from '@screens';
import { Loading } from '@components';

const StackApp = createStackNavigator();
export default AppContainer = () => {

    return (
        <Fragment>
            <NavigationContainer ref={nav => navigator = nav}>
                <StackApp.Navigator
                    initialRouteName={'Splash'}
                    screenOptions={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }}>
                    <StackApp.Screen name='Splash' component={Splash} options={{ headerShown: false, animationEnabled: false }} />
                    <StackApp.Screen name='Home' component={Home} options={{ headerShown: false, animationEnabled: false }} />
                </StackApp.Navigator>
            </NavigationContainer>
            <Loading />
        </Fragment>
    );
}