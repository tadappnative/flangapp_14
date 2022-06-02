export const HEADER_JS = `import React from 'react'
import {StyleSheet, Platform, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import Constants from "expo-constants";
import { config } from "../config";
import IconButton from "./IconButton";

const Header = (props) => {

    const { back, title, onNavigation, onOpenDrawer, statusColor, onBack } = props;

    return (
        <React.Fragment>
            <View style={styles.navbar}>
                <View style={styles.leftAbsolute}>
                    { back
                        ? <IconButton
                            size={32}
                            icon={Platform.OS === "ios" ? "chevron-back-outline" : "arrow-back-outline"}
                            style={ Platform.OS === "ios" ? { marginTop: 4 } : { marginTop: 18 } }
                            onTap={() => onBack()}
                        />
                        : config.appTemplate === 0
                            ? <IconButton
                                size={32}
                                icon={"menu-outline"}
                                style={ Platform.OS === "ios" ? { marginTop: 4 } : { marginTop: 18 } }
                                onTap={() => onOpenDrawer()}
                            />
                            : null
                    }
                </View>
                <Text
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={[
                        styles.title, Platform.OS === "ios" ? styles.iosTitle : styles.mdTitle,
                        Platform.OS === "android" && config.appTemplate  === 0 ? { paddingLeft: 48 } : {},
                        Platform.OS === "android" && back ? { paddingLeft: 48 } : {},
                    ]}
                >
                    {title.length < 19
                        ? title
                        : title.substring(0, 19) + '...'}
                </Text>
                <View style={styles.rightAbsolute}>
                    {config.barNavigation.map((item, index) => (
                        <IconButton
                            icon={item.icon}
                            size={24}
                            key={"bar_" + index}
                            style={ Platform.OS === "ios" ? { marginTop: 4, marginLeft: 16 } : { marginTop: 20,  marginLeft: 16 } }
                            onTap={() => onNavigation(item)}
                        />
                    ))}
                </View>
            </View>
            <StatusBar style={statusColor ? 'light' : 'dark'}/>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    navbar: {
        height: 90,
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
    title: {
        color: config.isDark ? "#ffffff" : "#000000",
        fontSize: Platform.OS === "ios" ? 18 : 21,
        flex: 1,
        textAlign: Platform.OS === "ios" ? 'center' : 'left',
    },
    mdTitle : {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
    },
    iosTitle: {
        fontWeight: '600'
    },
    leftAbsolute: {
        top: Constants.statusBarHeight,
        left: Platform.OS === "ios" ? 10 : 16,
        position: "absolute",
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        zIndex: 1,
    },
    rightAbsolute: {
        top: Constants.statusBarHeight,
        right: Platform.OS === "ios" ? 10 : 16,
        position: "absolute",
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        zIndex: 1
    }
});

export default Header;`;