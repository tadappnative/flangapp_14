export const TAB_JS = `import React from 'react'
import {StyleSheet, View, Platform, Pressable, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { config } from "../config";

const Tab = (props) => {

    const { icon, active, label, onTap } = props;

    const pressObject = {
        color: 'rgba(255,255,255, 0.3)',
        radius: 25,
        borderless: true
    };

    return (
        <React.Fragment>
            <View style={styles.buttonsContainer}>
                <Pressable
                    android_ripple={pressObject}
                    style={({pressed}) => [
                        pressed & Platform.OS === "ios" && styles.pressedIos, styles.button
                    ]}
                    onPress={() => onTap()}
                >
                    <Ionicons name={icon} size={26} color={active ? config.activeColor : '#757575'} />
                    <Text style={[styles.headline, {color: active ? config.activeColor : '#757575'}]}>
                        { label }
                    </Text>
                </Pressable>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        textAlign: 'center',
        width: 100
    },
    pressedIos: {
        opacity: 0.4
    },
    button: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headline: {
        textAlign: 'center',
        fontSize: 10
    }
});

export default Tab;`;