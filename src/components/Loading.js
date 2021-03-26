import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Loading = () => {
    const { loading } = useSelector(state => state.cafe);

    return (
        loading ? (
            <View style={styles.container}>
                <View style={styles.indicator}>
                    <ActivityIndicator style={{ height: 80 }} size="large" color={'#FFF'} />
                </View>
            </View>
        ) : null
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: '#00000080',
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicator: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
    }
});

export default Loading;