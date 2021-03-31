import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

import { colors } from '../Common';

function HeaderText(props) {

    return (
        <RNText style={[ styles.text, { ...props.style } ]}>{props.children}</RNText>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        color: colors.snowWhite,
        fontFamily: 'Pacifico-Regular'
    }
})

export default HeaderText;