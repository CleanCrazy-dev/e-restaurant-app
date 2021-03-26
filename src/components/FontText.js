import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

export default class FontText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      font: this.props.font || 'SFProText-Regular',
    };
  }

  textStyle = () => {
    return [
      { fontFamily : this.state.font },
      this.props.style,
    ];
  }

  render() {
    return (
      <Text {...this.props} style={this.textStyle()}>
        {this.props.children}
      </Text>
    );
  }
}