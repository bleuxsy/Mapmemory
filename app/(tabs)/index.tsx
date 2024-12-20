import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsiaMap from "../asiamap"; 
import EuropeMap from "../europemap"; 
import AfricaMap from "../africamap";
import OceaniaMap from "../oceaniamap";
import { useFocusEffect } from "@react-navigation/native";
import AmericaMap from "../americamap";


export default function Index() {
  const [recentPhotos, setRecentPhotos] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [continentDropdownVisible, setContinentDropdownVisible] = useState(false);
  const [topCountries, setTopCountries] = useState([]);
  
  const continents = ["Asia", "Europe", "Oceania","Africa","America"];

  
  const fetchRecentPhotos = async () => {
    try {
      const existingData = await AsyncStorage.getItem("photoData");
      const parsedData = existingData ? JSON.parse(existingData) : [];
      const recentData = parsedData.slice(-3).reverse();
      setRecentPhotos(recentData);
      const countryCount = {};
      parsedData.forEach((item) => {
        if (countryCount[item.country]) {
          countryCount[item.country] += 1;
        } else {
          countryCount[item.country] = 1;
        }
      });

      
      const sortedCountries = Object.entries(countryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2);

      setTopCountries(sortedCountries);
    } catch (error) {
      console.log("Error fetching recent photos: ", error);
    }
  };
 

useFocusEffect(
  React.useCallback(() => {
    console.log("Index 화면에 다시 진입했습니다. 데이터를 새로 불러옵니다.");
    fetchRecentPhotos();
  }, [])
);
  
  const renderContent = () => {
    switch (selectedContinent) {
      case "Asia":
        return <AsiaMap />;
      case "Europe":
        return (
          <View style={{ transform: [{ scale: 0.71 }] }}> 
          <EuropeMap />
          </View>
        );
        case "America":
        return (
          <View style={{ transform: [{ scale: 0.73 }] }}> 
            <AmericaMap />
          </View>
          
          
        );
      
        case "Africa":
        return (
          <View style={{ transform: [{ scale: 0.7 }] }}> 
          <AfricaMap />
          
          </View>
        );
      case "Oceania":
        return (
          <View style={{ transform: [{ scale: 0.08 }] }}> 
          <OceaniaMap />
          </View>
        )
    }
  };
  const countryIcons = {
    France: require("../../assets/images/country_icon/France_icon.png"),
    Japan: require("../../assets/images/country_icon/Japan_icon.png"),
    "South Korea": require("../../assets/images/country_icon/South Korea_icon.png"),
    USA: require("../../assets/images/country_icon/USA_icon.png"),
    Germany: require("../../assets/images/country_icon/Germany_icon.png"),
    Canada: require("../../assets/images/country_icon/Canada_icon.png"),
    China: require("../../assets/images/country_icon/China_icon.png"),
    Egypt: require("../../assets/images/country_icon/Egypt_icon.png"),
    India: require("../../assets/images/country_icon/India_icon.png"),
    Italy: require("../../assets/images/country_icon/Italy_icon.png"),
    "South Africa": require("../../assets/images/country_icon/South Africa_icon.png"),
    Spain: require("../../assets/images/country_icon/Spain_icon.png"),
  };

  return (
    <View style={styles.container}>
    <View style={styles.contentWrapper}>
      
      <Text style={styles.title}>여행지 고르기</Text>
  
     
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setContinentDropdownVisible(!continentDropdownVisible)}
      >
        <Text style={styles.dropdownText}>
          {selectedContinent || "Select a continent"}
        </Text>
      </TouchableOpacity> 
  
      
      {continentDropdownVisible && (
        <View style={styles.dropdownList}>
          {continents.map((continent, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedContinent(continent);
                setContinentDropdownVisible(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{continent}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
  
     
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  
   
    <View style={styles.recentPhotosContainer}>
    <Text style={styles.recentTitle}>제일 많이 저장한 나라</Text>
    <FlatList
  data={topCountries}
  keyExtractor={(item, index) => index.toString()}
  horizontal
  renderItem={({ item }) => (
    <View style={styles.muchPhoto}>
     
      {countryIcons[item[0]] ? (
        <Image source={countryIcons[item[0]]} style={styles.muchPhotoIcon} />
      ) : (
        <Text style={styles.noIcon}>🌍</Text> 
      )}
      
      <Text style={styles.muchPhotoText}>{item[0]}</Text>
    </View>
  )}
  contentContainerStyle={styles.muchPhotoList}
/>
      <Text style={styles.recentTitle}>최근 추가한 사진</Text>
      <FlatList
        data={recentPhotos}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.recentPhotoCard}>
            <Image source={{ uri: item.photoUri }} style={styles.recentImage} />
            <View style={styles.recentInfo}>
              {countryIcons[item.country] ? (
                <View style={styles.iconWrapper}>
                  <Image source={countryIcons[item.country]} style={styles.icon} />
                </View>
              ) : (
                <Text style={styles.noIcon}>🌍</Text> 
              )}
              <Text style={styles.recentCountry}>{item.country}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.recentPhotoList}
      />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#",
    justifyContent: "center", 
    alignItems: "center",
  },
  contentWrapper: {
    flex: 1,
   
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop:20,
    color: "#4e7cf3",
  },
  dropdown: {
    
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    zIndex:1,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownList: {
    position: "absolute",
    top: 110, 
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    zIndex: 10, 
  },
  
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    zIndex:1,
    
  },
  dropdownItemText: {
    fontSize: 16,
    zIndex:1,
    color: "#333",
  },

  contentContainer: {
    top:-220,
    left: -220,
    justifyContent: 'center',
    alignItems: 'center', 
    width: '100%', 
    height: 100,
    
  },
  
  placeholder: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
    left: 200
  },
   recentPhotosContainer: {
    position: "absolute",
    bottom: 0,
    borderTopRightRadius:50,
    borderTopLeftRadius:50,
    borderWidth:2,
    borderColor:"white",
    width: "100%",
    paddingBottom: 10,
    backgroundColor: "white",
  },
  recentTitle: {
    alignSelf:'center',
    fontSize: 18,
    fontWeight: "bold",
    color: "#4e7cf3",
    marginTop: 20,
    margin: 10,
    marginBottom: 10,
  },
  recentPhotoList: {
    paddingHorizontal: 10,
    height: 135,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  muchPhotoList: {
    paddingHorizontal:15,
    height: 50, 
    alignItems: "center", 

    
  },
  recentPhotoCard: {
    width: 130,
    height: 130,
    marginRight: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  muchPhoto: {
    flexDirection: "row", 
    alignItems: "center",
    justifyContent:"center",
    marginRight: 15, 
    width:190,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    elevation: 3, 
  },
  recentImage: {
    width: 130,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 100,
    resizeMode: "cover",
  },
  recentInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  iconWrapper: {
    width: 23,
    height: 17,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#4e7cf3",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    borderRadius: 3,
    borderTopLeftRadius: 0,
    width: 21,
    height: 15,
  },
  noIcon: {
    fontSize: 14,
    marginRight: 5,
    color: "#888",
  },
  muchPhotoIcon: {
    width: 28,
    height: 21,
    
    resizeMode: "contain",
    marginRight: 10, 
  },
  muchPhotoText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333",
  },
  recentCountry: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
  },
});