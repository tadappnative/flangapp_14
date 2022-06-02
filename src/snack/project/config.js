export const CONFIG_JS = `export const config = {
    show: "app",

    appName: "Flangapp",
    appLink: "https://codecanyon.net/",
    displayTitle: true,
    color: "#262626",
    isDark: true,
    appEmail: "tadapp@yandex.ru",
    // 0 - drawer, 1 - tabs, 2 - bar, 3 - blank
    appTemplate: 1,
    // 0 - none, 1 - line, 2 - spinner
    indicator: 1,
    indicatorColor: "#6ca12b",
    cssHideBlock: ["shared-global_header-mobile_menu_component__headerMobile", "shared-global_header-global_header_component__desktopHeader", "canvas__header", "shared-global_header-global_header_component__headerWrapper"],
    userAgent: "",
    activeColor: "#6ca12b",
    iconColor: "#6ca12b",

    drawerTitle: "Flangapp",
    drawerSubtitle: "Convert site to app",
    // 0 - none, 1 - color, 2 - image
    drawerBackgroundMode: 2,
    drawerBackgroundColor: "#0e74e9",
    drawerIsDark: true, // true - white, false - black
    drawerBackgroundImage: "https://firebasestorage.googleapis.com/v0/b/flangapp.appspot.com/o/demo_static%2Fdrawer_background.png?alt=media&token=97b03465-edef-408f-b735-272d07787d97",
    drawerLogoImage: "https://firebasestorage.googleapis.com/v0/b/flangapp.appspot.com/o/demo_static%2Fflangapp_app_logo.png?alt=media&token=fdd31372-5211-4cf4-bcf6-ea6a32132190",
    drawerIsDisplayLogo: 0,

    splashBackgroundColor: "#0e74e9",
    splashTextColor: "#ffffff",
    splashBackgroundImage: "https://firebasestorage.googleapis.com/v0/b/flangapp.appspot.com/o/snack%2Fsplash_screen.png?alt=media&token=fedc928c-8559-47da-837d-9748b91c1462",
    splashTagline: "Top digital assets and services",
    splashLogoImage: "https://firebasestorage.googleapis.com/v0/b/flangapp.appspot.com/o/snack%2Fsplash_logo.png?alt=media&token=fead4084-50e4-4629-9272-d7779008cf56",
    splashIsDisplayLogo: true,
    splashIsBackgroundImage: true,

    mainNavigation: [
        {
            icon: "home-outline",
            name: "Home",
            action: {
                type: "internal",
                value: "https://codecanyon.net/"
            }
        },
        {
            icon: "albums-outline",
            name: "Market",
            action: {
                type: "internal",
                value: "https://codecanyon.net/category/mobile"
            }
        },
        {
            icon: "cart-outline",
            name: "Cart",
            action: {
                type: "internal",
                value: "https://codecanyon.net/cart"
            }
        },
        {
            icon: "flame-outline",
            name: "Most popular",
            action: {
                type: "internal",
                value: "https://codecanyon.net/top-sellers"
            }
        },
        {
            icon: "chatbubbles-outline",
            name: "Forum",
            action: {
                type: "internal",
                value: "https://forums.envato.com/"
            }
        },
    ],
    barNavigation: [
        {
            icon: "share-social-outline",
            name: "Share",
            action: {
                type: "share",
                value: ""
            }
        },
        {
            icon: "ellipsis-horizontal-outline",
            name: "Menu",
            action: {
                type: "open_modal",
                value: ""
            }
        }
    ],
    modalNavigation: [
        {
            icon: "help-buoy-outline",
            name: "Buying and Item Support",
            action: {
                type: "internal",
                value: "https://help.market.envato.com/hc/en-us/categories/200216004"
            }
        },
        {
            icon: "cube-outline",
            name: "Licenses",
            action: {
                type: "internal",
                value: "https://help.market.envato.com/hc/en-us/sections/200616950"
            }
        },
        {
            icon: "person-circle-outline",
            name: "Your Account",
            action: {
                type: "internal",
                value: "https://help.market.envato.com/hc/en-us/categories/200211970"
            }
        },
        {
            icon: "ribbon-outline",
            name: "Copyright and Trademarks",
            action: {
                type: "internal",
                value: "https://help.market.envato.com/hc/en-us/categories/200211970"
            }
        },
        {
            icon: "card-outline",
            name: "Tax & Compliance",
            action: {
                type: "internal",
                value: "https://help.market.envato.com/hc/en-us/categories/200211990"
            }
        },
    ]
}`;