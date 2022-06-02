import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1145FF',
                white: '#ffffff',
                white_only: '#ffffff',
                success: '#41D6A0',
                smoke: '#99A2AD',
                orange: '#F0A747',
                danger: '#FF004B',
                black: '#000000',
                snow: '#fafafa',
                whitesmoke: '#f5f5f5',
                blue_dark: "#0b2149",
                android: "#00de7a"
            },
            dark: {
                primary: '#348bf6',
                white: '#1d1d2c',
                white_only: '#ffffff',
                success: '#41D6A0',
                smoke: '#959cb7',
                orange: '#F0A747',
                danger: '#FF004B',
                black: '#ffffff',
                snow: '#1d1d2c',
                whitesmoke: '#1d1d2c',
                blue_dark: "#0b2149",
                android: "#00de7a"
            }
        }
    }
});