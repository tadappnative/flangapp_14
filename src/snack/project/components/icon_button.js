export const ICON_BUTTON_JS = `import React from 'react'
import {StyleSheet, View, Platform, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { config } from "../config";

const IconButton = (props) => {

    const { icon, size, style, onTap } = props;

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
                        pressed & Platform.OS === "ios" && styles.pressedIos,
                        styles.button, style
                    ]}
                    onPress={() => onTap()}
                >
                    <Ionicons
                        name={icon}
                        size={size}
                        color={config.isDark ? '#ffffff' : '#000000'}
                    />
                </Pressable>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: 2,
    },
    pressedIos: {
        opacity: 0.4
    }
});

export default IconButton;`;