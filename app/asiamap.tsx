import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; 
export default function AsiaMap() {
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
        countMap[item.country] = (countMap[item.country] || 0) + 1;
      });

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
        source={require("../assets/images/asia_country/AsiaMapBackground.png")}
        style={[
          styles.country,
          {
            top: mapHeight * 0.583,
            left: mapWidth * 0.052,
            tintColor: "white",
          },
        ]}
      />
     
      <Image
        source={require("../assets/images/asia_country/China.png")}
        style={[
          styles.country,
          {
            top: mapHeight * 0.84,
            left: mapWidth * 0.339,
            tintColor: getColor("China"),
          },
        ]}
      />

     
      <Image
        source={require("../assets/images/asia_country/Japan.png")}
        style={[
          styles.country,
          {
            top: mapHeight * 0.894,
            left: mapWidth * 0.622,
            tintColor: getColor("Japan"),
          },
        ]}
      />

      
      <Image
        source={require("../assets/images/asia_country/India.png")}
        style={[
          styles.country,
          {
            top: mapHeight * 0.957,
            left: mapWidth * 0.308,
            tintColor: getColor("India"),
          },
        ]}
      />

     
      <Image
        source={require("../assets/images/asia_country/South Korea.png")}
        style={[
          styles.country,
          {
            top: mapHeight * 0.943,
            left: mapWidth * 0.602,
            tintColor: getColor("South Korea"),
          },
        ]}
      />

      
      <Image
        source={require("../assets/images/asia_country/Russia.png")}
        style={[
          styles.country,
          {
            top: mapHeight * 0.584,
            left: mapWidth * 0.055,
            tintColor: getColor("Russia"),
          },
        ]}
      />

      
      <Image
        source={require("../assets/images/asia_country/Thailand.png")}
        style={[
          styles.country,
          {
            top: mapHeight * 1.038,
            left: mapWidth * 0.4558,
            tintColor: getColor("Thailand"),
          },
        ]}
      />

      
      <Image
        source={require("../assets/images/asia_country/Indonesia.png")}
        style={[
          styles.country,
          {
            top: mapHeight * 1.12,
            left: mapWidth * 0.44,
            tintColor: getColor("Indonesia"),
          },
        ]}
      />
       <Image
        source={require("../assets/images/asia_country/Vietnam.png")}
        style={[
          styles.country,
          { top: mapHeight * 1.025, left: mapWidth * 0.4757, tintColor: getColor("Vietnam") },
        ]}
      />

      
      <Image
        source={require("../assets/images/asia_country/Philippines.png")}
        style={[
          styles.country,
          { top: mapHeight * 1.055, left: mapWidth * 0.555, tintColor: getColor("Philippines") },
        ]}
      />

      <Image
        source={require("../assets/images/asia_country/Kazakhstan.png")}
        style={[
          styles.country,
          { top: mapHeight * 0.828, left: mapWidth * 0.195, tintColor: getColor("Kazakhstan") },
        ]}
      />
      

      <Image
        source={require("../assets/images/asia_country/Mongolia.png")}
        style={[
          styles.country,
          { top: mapHeight * 0.85, left: mapWidth * 0.41, tintColor: getColor("Mongolia") },
        ]}
      />
      
      <Image
        source={require("../assets/images/asia_country/Iran.png")}
        style={[
          styles.country,
          { top: mapHeight * 0.927, left: mapWidth * 0.18, tintColor: getColor("Iran")},
        ]}
      />
     
      <Image
        source={require("../assets/images/asia_country/Pakistan.png")}
        style={[
          styles.country,
          { top: mapHeight * 0.9462, left: mapWidth * 0.269, tintColor: getColor("Pakistan")},
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