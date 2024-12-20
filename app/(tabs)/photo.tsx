import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; 

export default function Photo() {
  const [continent, setContinent] = useState(""); 
  const [country, setCountry] = useState("");
  const [photos, setPhotos] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedPhoto, setSelectedPhoto] = useState(null); 
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

  const searchPhotos = async () => {
    if (!continent || !country) {
      Alert.alert("Error", "Please select both a continent and a country.");
      return;
    }
    try {
      const existingData = await AsyncStorage.getItem("photoData");
      const parsedData = existingData ? JSON.parse(existingData) : [];
      const filteredData = parsedData.filter(
        (item) => item.continent === continent && item.country === country
      );
      setPhotos(filteredData);
    } catch (error) {
      Alert.alert("Error", "Failed to load photos.");
    }
  };
  const deletePhoto = async (photoIndex) => {
    try {
      const existingData = await AsyncStorage.getItem("photoData");
      const parsedData = existingData ? JSON.parse(existingData) : [];
      const updatedData = parsedData.filter((item, index) => {
        return !(
          item.continent === continent &&
          item.country === country &&
          item.title === photos[photoIndex].title &&
          item.photoUri === photos[photoIndex].photoUri &&
          item.description === photos[photoIndex].description
        );
      });
      await AsyncStorage.setItem("photoData", JSON.stringify(updatedData));
      const filteredPhotos = updatedData.filter(
        (item) => item.continent === continent && item.country === country
      );
      setPhotos(filteredPhotos);
      Alert.alert("Deleted", "Photo deleted successfully!");
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to delete photo.");
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
              {continent || "Continent"}
            </Text>
          </TouchableOpacity>

         
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setCountryDropdownVisible(!countryDropdownVisible)}
          >
            <Text style={styles.dropdownText}>
              {country || "Country"}
            </Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.searchButton} onPress={searchPhotos}>
            <Ionicons name="search" size={24} color="white" />
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
          />
        )}

        
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedPhoto({ ...item, index });
                setModalVisible(true);
              }}
            >
              <View style={styles.photoCard}>
                <Image source={{ uri: item.photoUri }} style={styles.photo} />
                <Text style={styles.photoTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.photoList}
        />

        {selectedPhoto && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image
                  source={{ uri: selectedPhoto.photoUri }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedPhoto.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedPhoto.description}
                </Text>
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletePhoto(selectedPhoto.index)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
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
    zIndex:10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    width: 35,
    height: 35,
    backgroundColor: "#366DFE",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  photoList: {
    justifyContent: "center",
  },
  photoCard: {
    
    width: 170,
    aspectRatio: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
    elevation: 2,
  },
  photo: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
  },
  photoTitle: {
    padding: 10,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row", 
    justifyContent: "space-between",
    width: "60%", 
    marginTop: 10,
  },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "80%", padding: 20, backgroundColor: "white", borderRadius: 10, alignItems: "center" },
  modalImage: { width: "100%", height: 250, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  modalDescription: { fontSize: 16, marginBottom: 20 },
  deleteButton: { backgroundColor: "red", padding: 10, borderRadius: 5, marginVertical: 5 },
  deleteText: { color: "white", fontWeight: "bold" },
  closeButton: { backgroundColor: "gray", padding: 10, borderRadius: 5 ,marginVertical: 5},
  closeText: { color: "white", fontWeight: "bold" },
});