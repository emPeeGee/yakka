import { View, Text, StyleSheet } from 'react-native';

interface EmojiProps {
  emoji?: string; // emoji as Unicode character
  emojiName?: string; // name of the emoji
}

export const Emoji: React.FC<EmojiProps> = ({ emoji, emojiName }) => {
  // If emojiName is provided, convert it to Unicode
  const emojiUnicode = emojiName && !emoji ? getEmojiUnicode(emojiName) : emoji;

  return (
    <View style={styles.container} role="img" aria-label={emojiUnicode}>
      <Text style={styles.emoji}>{emojiUnicode}</Text>
    </View>
  );
};

// const Emoji = React.memo(({ className, label, symbol }) => (
//   <span className={className} role="img" aria-label={label}>
//     {String.fromCodePoint(symbol)}
//   </span>
// ));

const getEmojiUnicode = (emojiName: string): string => {
  switch (emojiName) {
    case 'smile':
      return '😊';
    case 'heart':
      return '❤️';
    // Add more cases for other emojis
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
  },
});
