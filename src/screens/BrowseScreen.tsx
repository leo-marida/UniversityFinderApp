// src/screens/BrowseScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  SafeAreaView,
  Button,
  TextInput, // <-- 1. Import TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import WebView from 'react-native-webview';
import { fetchUniversities } from '../api/universityApi';
import { getData, storeData } from '../storage/asyncStorage';
import UniversityCard from '../components/UniversityCard';
import Loader from '../components/Loader';
import { colors } from '../theme/colors';
import { University } from '../types';

const BrowseScreen = () => {
  // State variables
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [favorites, setFavorites] = useState<University[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [page, setPage] = useState<number>(1);
  const [allApiResults, setAllApiResults] = useState<University[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // <-- 2. Add new state for the search query

  // Load initial data and saved user preferences
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedCountry = await getData<string>('selectedCountry');
        const countryToLoad = storedCountry || '';
        setSelectedCountry(countryToLoad);

        const storedFavorites = await getData<University[]>('favorites');
        setFavorites(storedFavorites || []);

        // To get the country list, we must fetch all universities first one time
        const allUniversitiesForCountries = await fetchUniversities('');
        const uniqueCountries = [
          ...new Set(allUniversitiesForCountries.map(uni => uni.country)),
        ].sort();
        setAllCountries(uniqueCountries);

        // Now, fetch the universities for the selected country
        const universitiesForDisplay = await fetchUniversities(countryToLoad);
        setAllApiResults(universitiesForDisplay);
        setUniversities(universitiesForDisplay.slice(0, 20)); // Initial page
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Handle filtering by country
  const handleSearchByCountry = async (country: string) => {
    setSelectedCountry(country);
    await storeData('selectedCountry', country);
    setPage(1);
    setLoading(true);
    setError(null);
    setSearchQuery(''); // Clear search when country changes

    try {
      const results = await fetchUniversities(country);
      setAllApiResults(results);
      setUniversities(results.slice(0, 20));
    } catch (err) {
      setError('Failed to fetch universities for the selected country.');
    } finally {
      setLoading(false);
    }
  };

  // Handle infinite scrolling
  const loadMoreResults = () => {
    if (loading || universities.length >= allApiResults.length) return;

    const nextPage = page + 1;
    const newUniversities = allApiResults.slice(page * 20, nextPage * 20);
    setUniversities(prev => [...prev, ...newUniversities]);
    setPage(nextPage);
  };

  // Handle adding/removing favorites
  const toggleFavorite = (university: University) => {
    const isFavorite = favorites.some(fav => fav.name === university.name);
    let updatedFavorites: University[];

    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.name !== university.name);
    } else {
      updatedFavorites = [...favorites, university];
    }
    setFavorites(updatedFavorites);
    storeData('favorites', updatedFavorites);
  };

  const openUniversityModal = (university: University) => {
    setSelectedUniversity(university);
    setModalVisible(true);
  };
  
  // <-- 3. Add filtering logic based on the search query
  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && page === 1) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 4. Add the TextInput component for searching */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search displayed results by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#888"
      />
      <Picker
        selectedValue={selectedCountry}
        onValueChange={itemValue => handleSearchByCountry(itemValue)}>
        <Picker.Item label="All Countries" value="" />
        {allCountries.map(country => (
          <Picker.Item key={country} label={country} value={country} />
        ))}
      </Picker>
      <FlatList<University>
        data={filteredUniversities} // <-- 5. Use the filtered list here
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <UniversityCard
            university={item}
            onFavorite={toggleFavorite}
            isFavorite={favorites.some(fav => fav.name === item.name)}
            onPress={() => openUniversityModal(item)}
          />
        )}
        onEndReached={loadMoreResults}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && page > 1 ? <Loader /> : null}
      />
      {selectedUniversity && (
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <SafeAreaView style={{ flex: 1 }}>
            <Button title="Close" onPress={() => setModalVisible(false)} />
            <WebView source={{ uri: selectedUniversity.web_pages[0] }} />
          </SafeAreaView>
        </Modal>
      )}
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
  errorText: {
    color: colors.error,
    fontSize: 16,
  },
  // 6. Add the style for the search bar
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    color: colors.text,
  },
});

export default BrowseScreen;