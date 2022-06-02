export const CELL_JS = `import React, { Component } from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {config} from "../config";

class Cell extends Component {

    handlePressEvent = (item) => {
        const { onPress } = this.props;
        onPress && onPress(item);
    }

    render() {

        const { item, active } = this.props;

        const pressObject = {
            color: 'grey',
            borderless: false
        };

        return(
            <Pressable
                android_ripple={pressObject}
                style={({pressed}) => [
                    {
                        backgroundColor: pressed
                            ? '#eeeeee'
                            : 'white'
                    },
                    active === item.url && styles.active
                ]}
                onPress={() => this.handlePressEvent(item)}
            >
                <View style={styles.item}>
                    <Ionicons
                        name={item.icon}
                        size={25}
                        color={config.iconColor}
                        style={styles.icon}
                    />
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={styles.text}
                    >
                        { item.name }
                    </Text>
                </View>
            </Pressable>
        );

    }

}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 12,
        width: '100%'
    },
    text: {
        fontSize: 17,
        flex: 1,
        marginRight: 16
    },
    active: {
        backgroundColor: "#eeeeee"
    },
    icon: {
        marginRight: 16
    }
});

export default Cell;`;