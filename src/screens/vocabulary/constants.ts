import { Dimensions } from 'react-native';

// Get the height of the screen
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
// Calculate 70% of the screen height
export const CARD_HEIGHT = 0.7 * screenHeight;
export const CARD_WIDTH = 0.9 * screenWidth - 24 * 2; // 24 px is the padding
