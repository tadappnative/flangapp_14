export const APP_JS = `import React from "react";
import {
    Platform,
    StyleSheet,
    View,
    SafeAreaView,
    Dimensions,
    FlatList,
    Text,
    Image,
    ImageBackground,
    Linking,
    Share,
    BackHandler
} from 'react-native';
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import {config} from "./config";
import * as Progress from 'react-native-progress';
import { WebView } from 'react-native-webview';
import PagerView from 'react-native-pager-view';
import Modal from "react-native-modal";
import Tab from "./components/Tab";
import Cell from "./components/Cell";
import Constants from "expo-constants";
import Splash from "./components/Splash";
import BottomSheet from "react-native-gesture-bottom-sheet";

const { width } = Dimensions.get("window");

class App extends React.Component {

    constructor(props) {
        super(props);
        this.pagerRef = React.createRef();
        this.bottomSheet = React.createRef();
        this.panResponder = React.createRef();
        this.state = {
            init: false,
            collection: [],
            backs: [],
            currentIndex: 0,
            sideVisible: false,
            titleFit: ""
        };
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener("hardwareBackPress", () => this.handleBackButtonPress())
        }
        if (config.appTemplate === 1 && config.mainNavigation.length > 0) {
            let array = [];
            let backs = [];
            for (let i = 0; i < config.mainNavigation.length; i++) {
                let item = config.mainNavigation[i];
                if (item.action.type === 'internal') {
                    array.push({
                        controller: null,
                        url:item.action.value,
                        loading: true,
                        title: config.appName,
                        error: null,
                        icon: item.icon,
                        name: item.name
                    });
                    backs.push(false);
                }
                this.setState({
                    collection: array,
                    init: true
                });
            }
        } else {
            this.setState({
                collection: [
                    {
                        controller: null,
                        url: config.appLink,
                        loading: true,
                        title: config.appName,
                        error: null,
                        icon: "",
                        name: ""
                    }
                ],
                backs: [false],
                init: true
            });
        }
    }
    
    handleBackButtonPress = () => {
      if (this.state.collection.length) {
        if (this.state.backs[this.state.currentIndex]) {
          this.state.collection[this.state.currentIndex].controller.goBack();
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    eventStartLoad(value, index) {
        let items = [...this.state.collection];
        let item = {...items[index]};
        if (value.navigationType !== 'backforward') {
            item.loading = true;
        }
        item.url = value.url;
        items[index] = item;
        this.setState({collection: items});
    }

    eventStopLoad(value, index) {
        let items = [...this.state.collection];
        let item = {...items[index]};
        item.loading = false;
        item.title = value.title;
        items[index] = item;
        this.setState({collection: items});
    }

    setActiveTab = (index) => {
        this.setState({
            currentIndex: index
        });
        this.pagerRef.current.setPageWithoutAnimation(index);
    }

    navigationAction = async (menuItem, close) => {
        if (close) {
            this.bottomSheet.current.close();
        }
        if (this.state.sideVisible) {
            this.setState({
                sideVisible: false
            })
        }
        if (menuItem.action.type === 'internal') {
            let index = this.state.currentIndex;
            let items = [...this.state.collection];
            let item = {...items[index]};
            item.url = menuItem.action.value;
            items[index] = item;
            this.setState({collection: items});
        } else if (menuItem.action.type === 'external') {
            await Linking.openURL(menuItem.action.value);
        } else if (menuItem.action.type === 'share') {
            let index = this.state.currentIndex;
            await Share.share({
                message: this.state.collection[index].title + ' ' + this.state.collection[index].url,
            })
        } else if (menuItem.action.type === 'email') {
            await Linking.openURL('mailto:'+menuItem.action.value)
        } else if (menuItem.action.type === 'phone') {
            await Linking.openURL('tel:+'+menuItem.action.value);
        } else if (menuItem.action.type === 'open_modal') {
            this.setState({
                titleFit: menuItem.name
            })
            this.bottomSheet.current.show();
        }
    }

    toggleDrawer = () => {
        this.setState({
            sideVisible: !this.state.sideVisible
        })
    }

    goBack = () => {
        this.state.collection[this.state.currentIndex].controller.goBack();
    }

    onNavigationStateChange = (navState, index) => {
        let items = [...this.state.backs];
        items[index] = navState.canGoBack;
        this.setState({backs: items});

    }

    render() {
        let css = '';
        for (let i = 0; i < config.cssHideBlock.length; i++) {
            css += 'document.getElementsByClassName("' + config.cssHideBlock[i] + '")[0].style.display = "none";true;';
        }

        let index = this.state.currentIndex;

        const renderItem = ({ item }) => (
            <Cell
                item={item}
                active={false}
                onPress={() => this.navigationAction(item)}
            />
        );

        const renderFit = ({ item }) => (
            <Cell
                item={item}
                active={false}
                onPress={() => this.navigationAction(item, true)}
            />
        );

        return(
            <React.Fragment>
                { config.show === 'app' ? <View style={styles.scaffold}>
                    { this.state.init && <React.Fragment>
                        { config.appTemplate !== 3 && <Header
                            back={this.state.backs[index]}
                            title={!config.displayTitle ? config.appName : this.state.collection[index].title}
                            onNavigation={this.navigationAction}
                            onOpenDrawer={this.toggleDrawer}
                            statusColor={this.state.sideVisible
                                ? config.drawerBackgroundMode === 0
                                    ? false
                                    : config.isDark
                                : config.isDark
                            }
                            onBack={this.goBack}
                        /> }
                        { this.state.collection[index].loading && config.indicator === 1 && config.appTemplate !== 3 ? <View style={styles.loadBar}>
                            <Progress.Bar
                                borderWidth={0}
                                progress={0.5}
                                unfilledColor={'#e3e1e1'}
                                color={config.indicatorColor}
                                width={null}
                                animated={true}
                                indeterminate={true}
                                borderRadius={0}
                            />
                        </View> : null }
                        <PagerView style={{flex: 1}} initialPage={0} ref={this.pagerRef} scrollEnabled={false}>
                            {this.state.collection.map((item, index) => (
                                <View style={{flex: 1}} key={index}>
                                    <WebView
                                        ref={(webView) => {
                                            this.state.collection[index].controller = webView;
                                        }}
                                        source={{ uri: item.url }}
                                        onLoad={(syntheticEvent) => {
                                            const { nativeEvent } = syntheticEvent;
                                            this.eventStopLoad(nativeEvent, index)
                                        }}
                                        onLoadStart={(syntheticEvent) => {
                                            const { nativeEvent } = syntheticEvent;
                                            this.eventStartLoad(nativeEvent, index);
                                        }}
                                        saveFormDataDisabled={true}
                                        sharedCookiesEnabled={true}
                                        javaScriptEnabled={true}
                                        domStorageEnabled={true}
                                        pullToRefreshEnabled={false}
                                        geolocationEnabled={true}
                                        allowFileAccessFromFileURLs={true}
                                        allowFileAccess={true}
                                        onNavigationStateChange={(navState) => this.onNavigationStateChange(navState, index)}
                                        injectedJavaScript={css}
                                        onMessage={(event) => {
                                            console.log('event: ', event)
                                        }}
                                        userAgent={config.userAgent}
                                    />
                                    { this.state.collection[index].loading && config.indicator === 2
                                        ? <Spinner/>
                                        : null
                                    }
                                </View>
                            ))}
                        </PagerView>
                        { config.appTemplate === 1 && <View style={styles.tabsContainer}>
                            <SafeAreaView style={styles.safeArea}>
                                {this.state.collection.map((item, index) => (
                                    <Tab
                                        key={"key_" + index}
                                        icon={item.icon}
                                        active={this.state.currentIndex === index}
                                        label={item.name}
                                        onTap={() => this.setActiveTab(index)}
                                    />
                                ))}
                            </SafeAreaView>
                        </View> }
                    </React.Fragment>}
                    <Modal
                        isVisible={this.state.sideVisible}
                        onBackdropPress={this.toggleDrawer} // Android back press
                        onSwipeComplete={this.toggleDrawer} // Swipe to discard
                        animationIn="slideInLeft"
                        animationOut="slideOutLeft"
                        swipeDirection="left"
                        useNativeDriver
                        hideModalContentWhileAnimating
                        propagateSwipe
                        style={styles.sideMenuStyle}
                    >
                        <View style={styles.safeAreaView}>
                            <View style={styles.container}>
                                { config.drawerBackgroundMode === 1 && <View style={styles.drawerColorHead}>
                                    { config.drawerIsDisplayLogo > 0 && <Image
                                        style={styles.logo}
                                        source={{uri: config.drawerLogoImage}}
                                        resizeMode="contain"
                                    /> }
                                    {config.drawerTitle.length > 0 && <Text
                                        ellipsizeMode='tail'
                                        numberOfLines={1}
                                        style={styles.title}
                                    >
                                        { config.drawerTitle }
                                    </Text>}
                                    { config.drawerSubtitle.length > 0 && <Text
                                        ellipsizeMode='tail'
                                        numberOfLines={1}
                                        style={styles.subtitle}
                                    >
                                        { config.drawerSubtitle }
                                    </Text> }
                                </View> }
                                { config.drawerBackgroundMode === 2 && <ImageBackground source={{
                                    uri: config.drawerBackgroundImage
                                }} resizeMode="cover" style={styles.drawerColorImage}>
                                    { config.drawerIsDisplayLogo > 0 && <Image
                                        style={styles.logo}
                                        source={{uri: config.drawerLogoImage}}
                                        resizeMode="contain"
                                    /> }
                                    {config.drawerTitle.length > 0 && <Text
                                        ellipsizeMode='tail'
                                        numberOfLines={1}
                                        style={styles.title}
                                    >
                                        { config.drawerTitle }
                                    </Text>}
                                    { config.drawerSubtitle.length > 0 && <Text
                                        ellipsizeMode='tail'
                                        numberOfLines={1}
                                        style={styles.subtitle}
                                    >
                                        { config.drawerSubtitle }
                                    </Text> }
                                </ImageBackground> }
                                <SafeAreaView style={{ height: "100%" }}>
                                    <FlatList
                                        data={config.mainNavigation}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.icon}
                                    />
                                </SafeAreaView>
                            </View>
                        </View>
                    </Modal>
                    <BottomSheet
                        draggable={true}
                        ref={this.bottomSheet}
                        hasDraggableIcon={true}
                        height={(config.modalNavigation.length * 60) + 80}
                        sheetBackgroundColor={"#ffffff"}
                    >
                        <SafeAreaView style={{ marginTop: 20 }}>
                            <Text style={{
                                paddingHorizontal: 16,
                                paddingBottom: 20,
                                color: "#757575",
                                fontSize: 17,
                                fontWeight: "600"
                            }}>
                                { this.state.titleFit.toUpperCase() }
                            </Text>
                            <FlatList
                                scrollEnabled={false}
                                data={config.modalNavigation}
                                renderItem={renderFit}
                                keyExtractor={item => item.icon}
                            />
                        </SafeAreaView>
                    </BottomSheet>
                </View> : <Splash/>}
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    scaffold: {
        height: '100%',
        backgroundColor : 'white',
        position: 'relative',
        marginBottom: config.appTemplate !== 3 ? 90 : 0,
        paddingBottom: config.appTemplate === 1 ? Platform.OS === "ios" ? 43 + Constants.statusBarHeight : 60 : 0,
        paddingTop: config.appTemplate === 3 ? Platform.OS === "ios" ? Constants.statusBarHeight : 0 : 0,
        zIndex: 5
    },
    tabsContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: Platform.OS === "ios" ? 43 + Constants.statusBarHeight : 60,
        paddingHorizontal: 0,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#d2d2d2',
        backgroundColor: '#ffffff'
    },
    safeArea: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
    },
    sideMenuStyle: {
        margin: 0,
        width: width * 0.75
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        color: config.drawerIsDark ? '#ffffff' : '#000000'
    },
    subtitle: {
        fontSize: 14,
        color: config.drawerIsDark ? '#d0d0d0' : '#343434'
    },
    drawerColorHead: {
        backgroundColor: config.drawerBackgroundColor,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16,
        paddingBottom: 16,
        marginBottom: 8,
    },
    logo: {
        height: 50
    },
    drawerBackgroundIMage: {
        flex: 1,
        justifyContent: "center"
    },
    drawerColorImage: {
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16,
        paddingBottom: 16,
        marginBottom: 8,
    },
    loadBar: {
        position: 'absolute',
        width: '100%',
        height: 5,
        top: Platform.OS === "ios" ? (54 + Constants.statusBarHeight) : 90,
        zIndex: 3
    }
});

export default App;`;