// src/screens/FavoritesScreen.tsx

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated, // Import Animated for the swipe gesture
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler'; // Import Swipeable
import { getData, storeData } from '../storage/asyncStorage';
import UniversityCard from '../components/UniversityCard';
import { colors } from '../theme/colors';
import { University } from '../types';

// This component defines the red "Delete" button that appears when you swipe
const renderRightActions = (
  progress: Animated.AnimatedInterpolation<number>,
  dragX: Animated.AnimatedInterpolation<number>,
  onPress: () => void,
) => {
  const trans = dragX.interpolate({
    inputRange: [-80, 0],
    outputRange: [0, 80],
    extrapolate: 'clamp',
  });
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.deleteButton}>
        <Animated.Text style={[styles.deleteText, { transform: [{ translateX: trans }] }]}>
          Delete
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<University[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        const storedFavorites = await getData<University[]>('favorites');
        setFavorites(storedFavorites || []);
      };
      loadFavorites();
    }, []),
  );

  const removeFromFavorites = (university: University) => {
    const updatedFavorites = favorites.filter(
      fav => fav.name !== university.name,
    );
    setFavorites(updatedFavorites);
    storeData('favorites', updatedFavorites);
  };

  // This function wraps our UniversityCard in a Swipeable component
  const renderItem = ({ item }: { item: University }) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, () => {
          removeFromFavorites(item);
        })
      }>
      <UniversityCard
        university={item}
        onFavorite={removeFromFavorites}
        isFavorite={true}
        onPress={() => {}} // No action on press in favorites, or you could open the webview
      />
    </Swipeable>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>You have no favorited universities yet.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList<University>
        data={favorites}
        keyExtractor={item => item.name}
        renderItem={renderItem} // Use the new render function
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  separator: {
    height: 0, // This is handled by the card's margin, but you could add a line here
  },
});

export default FavoritesScreen;