import { Snack } from 'snack-sdk';
import {config} from "@/config/config";
import {CONFIG_JS} from "@/snack/project/config";
import {APP_JS} from "@/snack/project/app";
import {CELL_JS} from "@/snack/project/components/cell";
import {HEADER_JS} from "@/snack/project/components/header";
import {ICON_BUTTON_JS} from "@/snack/project/components/icon_button";
import {SPINNER_JS} from "@/snack/project/components/spinner";
import {SPLASH_JS} from "@/snack/project/components/splash";
import {TAB_JS} from "@/snack/project/components/tab";
import axios from "axios";

const INITIAL_CODE_CHANGES_DELAY = 1000;
const VERBOSE = true;
const API_LINK = config.serverUrl;

export const snack = new Snack({
    sdkVersion: '43.0.0',
    dependencies: {
        '@expo/vector-icons': { version: '^12.0.0' },
        'expo-constants': { version: '~13.0.2' },
        'expo-status-bar': { version: '~1.2.0' },
        'react-native-modal': { version: '^13.0.1' },
        'react-native-pager-view': { version: '5.4.9' },
        'react-native-progress': { version: '^5.0.0' },
        'react-native-webview': { version: '11.15.0' },
        'react-native-svg': { version: '12.1.1' },
        'react-native-gesture-bottom-sheet': { version: '^1.1.0' },
    },
    files: {
        codeChangesDelay: INITIAL_CODE_CHANGES_DELAY,
        verbose: VERBOSE,
        'config.js': {
            type: 'CODE',
            contents: CONFIG_JS,
        },
        'App.js': {
            type: 'CODE',
            contents: APP_JS,
        },
        'components/Cell.js': {
            type: 'CODE',
            contents: CELL_JS,
        },
        'components/Header.js': {
            type: 'CODE',
            contents: HEADER_JS,
        },
        'components/IconButton.js': {
            type: 'CODE',
            contents: ICON_BUTTON_JS,
        },
        'components/Spinner.js': {
            type: 'CODE',
            contents: SPINNER_JS,
        },
        'components/Splash.js': {
            type: 'CODE',
            contents: SPLASH_JS,
        },
        'components/Tab.js': {
            type: 'CODE',
            contents: TAB_JS,
        },
    },
});

export const UpdateSnack = (uid, mode) => {
    axios.get(`${API_LINK}api/account/preview/get/${uid}/${mode}`).
    then(
        response => {
            snack.updateFiles({
                'config.js': {
                    type: 'CODE',
                    contents: response.data.config,
                },
            });
        }
    ).catch(
        error => {
            console.log(error)
        }
    );
    console.log('SNACK UPDATE')
}