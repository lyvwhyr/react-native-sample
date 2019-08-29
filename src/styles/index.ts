import {
  StyleSheet,
  Platform
} from 'react-native';


const regularFont = Platform.OS === 'ios' ? 'Nunito Sans' : 'NunitoSans-Medium';
const lightFont = Platform.OS === 'ios' ? 'Nunito Sans' : 'NunitoSans-Light';
const boldFont = Platform.OS === 'ios' ? 'Nunito Sans' : 'NunitoSans-Black';

const myTheme = {
  dark: true,
  roundness: 2,
  colors: {
    primary: '#F44336',
    accent: '#ff795b',
    backdrop: '#212121',
    background: '#212121',
    surface: '#212121',
    placeholder: '#E0E0E0',
    text: '#FFFFFF'
  },
  fonts: {
    regular: regularFont,
    medium: boldFont,
    light: lightFont,
    thin: lightFont
  }
};


export { myTheme };