export const SPINNER_JS = `import React from 'react'
import {StyleSheet, ActivityIndicator} from 'react-native';
import { config } from "../config";

const Spinner = () => {

    return (
        <ActivityIndicator
            style={styles.loading}
            size="large"
            color={config.indicatorColor}
        />
    );
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Spinner;`;