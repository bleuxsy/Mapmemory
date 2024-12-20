import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import moment from "moment-timezone";


const countries = [
  { name: "France", timezone: "Europe/Paris", icon: require("../../assets/images/country_icon/France_icon.png") },
  { name: "Japan", timezone: "Asia/Tokyo", icon: require("../../assets/images/country_icon/Japan_icon.png") },
  { name: "USA", timezone: "America/New_York", icon: require("../../assets/images/country_icon/USA_icon.png") },
  { name: "South Korea", timezone: "Asia/Seoul", icon: require("../../assets/images/country_icon/South Korea_icon.png") },
  { name: "India", timezone: "Asia/Kolkata", icon:require("../../assets/images/country_icon/India_icon.png") },
  { name: "Australia", timezone: "Australia/Sydney", icon: require("../../assets/images/country_icon/Australia_icon.png") },
];
export default function WorldClock() {
  const [searchInput, setSearchInput] = useState(""); 
  const [addedCountries, setAddedCountries] = useState([]);
  const [currentTimes, setCurrentTimes] = useState({}); 

 
  const addCountry = () => {
    const country = countries.find((c) => c.name.toLowerCase() === searchInput.toLowerCase());
    if (country && !addedCountries.some((c) => c.name === country.name)) {
      setAddedCountries([...addedCountries, country]);
      setSearchInput(""); 
    } else {
      alert("Country not found or already added!");
    }
  };

  
  const deleteCountry = (name) => {
    setAddedCountries(addedCountries.filter((country) => country.name !== name));
  };

 
  useEffect(() => {
    const updateTimes = () => {
      const updatedTimes = {};
      addedCountries.forEach((country) => {
        updatedTimes[country.name] = moment
          .tz(country.timezone)
          .format("YYYY-MM-DD HH:mm:ss");
      });
      setCurrentTimes(updatedTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000); 
    return () => clearInterval(interval); 
  }, [addedCountries]);

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>세계 시계</Text>

      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter country name"
          value={searchInput}
          onChangeText={setSearchInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addCountry}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>

      
      <FlatList
        data={addedCountries}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.countryCard}>
            <View style={styles.iconTextContainer}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.countryName}>{item.name}</Text>
            </View>
            <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{currentTimes[item.name]}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteCountry(item.name)}
            >
              <Text style={styles.deleteButtonText}>DEL</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#FFF",
    color: "#000",
  },
  addButton: {
    backgroundColor: "#366DFE",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  countryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 35,
    height: 25,
    marginRight: 10,
    borderWidth :1,
    borderRadius:6,
  },
  countryName: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  timeContainer: {
    flex: 1,
    paddingRight:8,
    alignItems: 'flex-end', 
  },
  timeText: {
    fontSize: 15,
    
    color: "black",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});