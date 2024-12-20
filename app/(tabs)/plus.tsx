import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function Plus() {
  const [continent, setContinent] = useState(""); 
  const [country, setCountry] = useState(""); 
  const [title, setTitle] = useState(""); 
  const [photoUri, setPhotoUri] = useState(null); 
  const [description, setDescription] = useState(""); 
  const [continentDropdownVisible, setContinentDropdownVisible] = useState(false);
  const [countryDropdownVisible, setCountryDropdownVisible] = useState(false);

  const continentData = {
    Africa: ["Nigeria", "South Africa", "Kenya", "Egypt"],
    Asia: ["China", "Japan", "India", "South Korea"],
    Europe: ["France", "Germany", "Spain", "Italy"],
    "North America": ["USA", "Canada", "Mexico", "Cuba"],
    "South America": ["Brazil", "Argentina", "Chile", "Colombia"],
    Oceania: ["Australia", "New Zealand", "Fiji", "Papua New Guinea"],
  };

  const continents = Object.keys(continentData);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const saveData = async () => {
    if (!continent || !country || !title || !photoUri || !description) {
      Alert.alert("Error", "All fields must be filled!");
      return;
    }

    const newEntry = { continent, country, title, photoUri, description };

    try {
      const existingData = await AsyncStorage.getItem("photoData");
      const parsedData = existingData ? JSON.parse(existingData) : [];
      parsedData.push(newEntry);
      await AsyncStorage.setItem("photoData", JSON.stringify(parsedData));
      Alert.alert("Success", "Data saved successfully!");

      setContinent("");
      setCountry("");
      setTitle("");
      setPhotoUri(null);
      setDescription("");
    } catch (error) {
      Alert.alert("Error", "Failed to save data!");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
       
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setContinentDropdownVisible(!continentDropdownVisible)}
          >
            <Text style={styles.dropdownText}>
              {continent || "Select a continent"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setCountryDropdownVisible(!countryDropdownVisible)}
          >
            <Text style={styles.dropdownText}>
              {country || "Select a country"}
            </Text>
          </TouchableOpacity>
        </View>

      
        {continentDropdownVisible && (
          <FlatList
            data={continents}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setContinent(item);
                  setContinentDropdownVisible(false);
                  setCountry("");
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.dropdownList}
          />
        )}

       
        {countryDropdownVisible && (
          <FlatList
            data={continentData[continent] || []}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setCountry(item);
                  setCountryDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.dropdownList}
          />
        )}

        
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />

       
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>Pick an Image</Text>
          )}
        </TouchableOpacity>

       
        <TextInput
          style={styles.input_description}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        
        <TouchableOpacity style={styles.saveButton} onPress={saveData}>
          <Text style={styles.saveText}>저장</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4ff",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownList: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  input_description: {
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  imagePicker: {
    backgroundColor: "#eee",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    color: "#888",
  },
  saveButton: { 
    position: "absolute",
    alignSelf:"center",
    bottom: 30,
    backgroundColor: "#366DFE",
    paddingVertical: 15,
    paddingHorizontal: 155,
    borderRadius: 5,
    
  },
  saveText: {
   
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});