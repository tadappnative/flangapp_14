export const SPLASH_JS = `import React, { Component } from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image, ActivityIndicator, ImageBackground} from 'react-native';
import {config} from "../config";

class Splash extends Component {

    render() {

        return(
            <React.Fragment>
                { !config.splashIsBackgroundImage ? <View style={styles.containerColor}>
                    <View/>
                    { config.splashIsDisplayLogo ? <Image
                        style={{ height: 100, width: 100 }}
                        source={{uri: config.splashLogoImage}}
                        resizeMode="contain"
                    /> : <View/> }
                    <SafeAreaView>
                        { config.splashTagline.length > 0 && <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={styles.headline}
                        >
                            { config.splashTagline }
                        </Text> }
                        <ActivityIndicator
                            style={{ marginTop: 20, marginBottom: 20 }}
                            size="large"
                            color={config.splashTextColor}
                        />
                    </SafeAreaView>
                </View> : <ImageBackground
                    style={styles.containerImage}
                    source={{
                        uri: config.splashBackgroundImage
                    }} resizeMode="cover"
                >
                    <View/>
                    { config.splashIsDisplayLogo ? <Image
                        style={{ height: 100, width: 100 }}
                        source={{uri: config.splashLogoImage}}
                        resizeMode="contain"
                    /> : <View/> }
                    <SafeAreaView>
                        { config.splashTagline.length > 0 && <Text
                            ellipsizeMode='tail'
                            numberOfLines={1}
                            style={styles.headline}
                        >
                            { config.splashTagline }
                        </Text> }
                        <ActivityIndicator
                            style={{ marginTop: 20, marginBottom: 20 }}
                            size="large"
                            color={config.splashTextColor}
                        />
                    </SafeAreaView>
                </ImageBackground> }
            </React.Fragment>
        );

    }

}

const styles = StyleSheet.create({
    containerColor: {
        flex: 1,
        backgroundColor: config.splashBackgroundColor,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: 20
    },
    containerImage: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: 20,
        height: '100%'
    },
    headline: {
        fontSize: 18,
        fontWeight: "500",
        color: config.splashTextColor,
        textAlign: 'center',
    }
});

export default Splash;`;