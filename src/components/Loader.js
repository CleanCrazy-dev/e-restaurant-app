import React, { Component, useState } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

export default class Loader extends Component {
  render() {
    if (this.props.enabled) return (
      <View style={styleOf.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );

    return null;
  }
}

const styleOf = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});