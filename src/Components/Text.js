import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

import { colors } from '../Common';

function Text(props) {

    return (
        <RNText style={[ styles.text, { ...props.style } ]}>{props.children}</RNText>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: colors.snowWhite,
        fontFamily: 'NotoSansHk-Regular'
    }
})

export default Text;