export const HEADER_JS = `import React from 'react'
import {StyleSheet, Platform, Text, View, useWindowDimensions} from 'react-native';
import {StatusBar} from "expo-status-bar";
import Constants from "expo-constants";
import { config } from "../config";
import IconButton from "./IconButton";

const Header = (props) => {

    const { back, title, onNavigation, onOpenDrawer, statusColor, onBack } = props;
    const { height, width } = useWindowDimensions();

    const iosTitlePadding = () => {
        let total = (config.barNavigation.length * 24) + (config.barNavigation.length * 16);
        if (back || config.appTemplate === 0) {
          if (config.barNavigation.length) {
            total = total - 32;
          }
        }
        return total;
    }

    const iosTitlePaddingRight = () => {
        let total = 0;
        if (back || config.appTemplate === 0) {
          if (!config.barNavigation.length) {
            total = 32;
          }
        }
        return total;
    }

    return (
        <React.Fragment>
            <View style={styles.navbar}>
                { Platform.OS === "ios" ? <React.Fragment>
                    <View>
                        { back
                            ? <IconButton
                                size={32}
                                icon={"chevron-back-outline"}
                                onTap={() => onBack()}
                            />
                            : config.appTemplate === 0
                                ? <IconButton
                                    size={32}
                                    icon={"menu-outline"}
                                    onTap={() => onOpenDrawer()}
                                />
                                : null
                        }
                    </View>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={[
                            styles.titleMainIOS,
                            styles.iosTitle,
                            { paddingLeft: iosTitlePadding(), paddingRight: iosTitlePaddingRight() }
                        ]}
                    >
                        {title.length < 20
                            ? title
                            : title.substring(0, 20) + '...'}
                    </Text>
                    <View style={styles.rightActions}>
                        {config.barNavigation.map((item, index) => (
                            <IconButton
                                icon={item.icon}
                                size={24}
                                key={"bar_" + index}
                                style={ { marginLeft: 16 } }
                                onTap={() => onNavigation(item)}
                            />
                        ))}
                    </View>
                </React.Fragment> : <React.Fragment>
                    <View style={[styles.startAndroid]}>
                        { back
                            ? <IconButton
                                size={32}
                                icon={"arrow-back-outline"}
                                style={{ marginRight: 16 }}
                                onTap={() => onBack()}
                            />
                            : config.appTemplate === 0
                                ? <IconButton
                                    size={32}
                                    icon={"menu-outline"}
                                    onTap={() => onOpenDrawer()}
                                />
                                : null
                        }
                        <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={[
                                styles.titleMainAndroid,
                                styles.mdTitle,
                            ]}
                        >
                            { title }
                        </Text>
                    </View>
                    <View/>
                    <View style={[styles.rightActionsAndroid]}>
                        {config.barNavigation.map((item, index) => (
                            <IconButton
                                icon={item.icon}
                                size={24}
                                key={"bar_" + index}
                                style={ { marginLeft: 16 } }
                                onTap={() => onNavigation(item)}
                            />
                        ))}
                    </View>
                </React.Fragment> }
            </View>
            <StatusBar style={statusColor ? 'light' : 'dark'}/>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    navbar: {
        height: Platform.OS === "ios" ? (54 + Constants.statusBarHeight) : 90,
        width: '100%',
        backgroundColor: config.color,
        paddingTop: Constants.statusBarHeight,
        elevation: Platform.OS === "ios" ? 0 : 6,
        paddingHorizontal: Platform.OS === "ios" ? 10 : 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
    },
    titleMainIOS: {
        color: config.isDark ? "#ffffff" : "#000000",
        fontSize: 18,
        flex: 1,
        textAlign: 'center'
    },
    titleMainAndroid: {
        color: config.isDark ? "#ffffff" : "#000000",
        fontSize: 21,
        textAlign: 'left',
    },
    mdTitle : {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal'
    },
    iosTitle: {
        fontWeight: '600'
    },
    rightActions: {
        display: 'flex',
        flexDirection: 'row',
    },
    rightActionsAndroid: {
        display: 'flex',
        flexDirection: 'row',
    },
    startAndroid: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    }
});

export default Header;`;