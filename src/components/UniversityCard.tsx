// src/components/UniversityCard.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { University } from '../types'; // Import our University type

// Define the types for the props that this component receives
interface UniversityCardProps {
  university: University;
  onFavorite: (university: University) => void;
  isFavorite: boolean;
  onPress: () => void;
}

const UniversityCard: React.FC<UniversityCardProps> = ({
  university,
  onFavorite,
  isFavorite,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.info}>
      <Text style={styles.name}>{university.name}</Text>
      <Text style={styles.country}>{university.country}</Text>
      {university['state-province'] && (
        <Text style={styles.state}>{university['state-province']}</Text>
      )}
    </View>
    {/* Pass the university object back to the onFavorite handler */}
    <TouchableOpacity onPress={() => onFavorite(university)}>
      <Text style={styles.favoriteText}>{isFavorite ? '❤️' : '🤍'}</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  country: {
    fontSize: 14,
    color: colors.secondary,
  },
  state: {
    fontSize: 12,
    color: colors.secondary,
  },
  favoriteText: {
    fontSize: 24,
    paddingLeft: 10, // Add some padding to make it easier to press
  },
});

export default UniversityCard;