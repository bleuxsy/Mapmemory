import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; 

export default function AmericaMap() {
  const { width, height } = Dimensions.get("window");
  const mapWidth = width;
  const mapHeight = mapWidth;

  const [countryData, setCountryData] = useState({}); 

  
  const fetchCountryData = async () => {
    try {
      const existingData = await AsyncStorage.getItem("photoData");
      const parsedData = existingData ? JSON.parse(existingData) : [];
      const countMap = {};
  
      parsedData.forEach((item) => {
        console.log("Item Country:", item.country); 
        countMap[item.country] = (countMap[item.country] || 0) + 1;
      });
      console.log("Country Data Map:", countMap);
      
      setCountryData(countMap);
    } catch (error) {
      console.log("Error fetching country data:", error);
    }
  };

    
    useFocusEffect(
      React.useCallback(() => {
        fetchCountryData();
      }, [])
    );
  
  
 
const getColor = (country) => {
  const count = countryData[country] || 0;
  console.log(`Country: ${country}, Count: ${count}`);
  
  if (count >= 20) {
    console.log("Returning: #002F6C");
    return "#002F6C";
  }
  if (count >= 15) {
    console.log("Returning: #003F88");
    return "#003F88";
  }
  if (count >= 10) {
    console.log("Returning: #0A56AE"); 
    return "#0A56AE";
  }
  if (count >= 7) {
    console.log("Returning: #3C80C1"); 
    return "#3C80C1";
  }
  if (count >= 5) {
    console.log("Returning: #8EBDF4"); 
    return "#8EBDF4";
  }
  if (count >= 3) {
    console.log("Returning: #A3D0FF"); 
    return "#A3D0FF";
  }
  if (count >= 1) {
    console.log("Returning: #D6E9FF"); 
    return "#D6E9FF";
  }
  console.log("Returning: #E0E0E0");
  return "#E0E0E0";
};

  return (
    <View style={styles.container}>

      <Image
              source={require("../assets/images/Americamap.png")}
              style={[
                styles.country,
                {
                  top: mapHeight * 0.67,
                  left: mapWidth * 0.2,
                  tintColor: "white",
                },
              ]}
            />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#366DFE",
  },
  country: {
    position: "absolute",
    resizeMode: "contain",
  },
});