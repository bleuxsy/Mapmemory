import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";


export default function MyPage() {
  const [name, setName] = useState("______");
  const [inputName, setInputName] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [photoCount, setPhotoCount] = useState(0);

  const loadPhotoData = async () => {
    try {
      const photoData = await AsyncStorage.getItem("photoData");
      if (photoData) {
        const parsedData = JSON.parse(photoData);
        setPhotoCount(parsedData.length);
      } else {
        setPhotoCount(0);
      }
    } catch (error) {
      console.error("Error loading photo data:", error);
    }
  };
   
    useFocusEffect(
      React.useCallback(() => {
        loadPhotoData();
      }, [])
    );
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const resetAppData = async () => {
    try {
      await AsyncStorage.clear();
      setName("김 승 연님");
      setPhotoUri(null);
      setPhotoCount(0);
    } catch (error) {
      console.error("Error clearing app data:", error);
    }
  };
  useEffect(() => {
    loadPhotoData();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
     
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder} />
            )}
          </View>
          <Text style={styles.nameText}>{name} 님</Text>
        </View>

        
        <View style={styles.infoContainer}>
          <Text style={styles.photoText}>저장한 사진</Text>
          <Text style={styles.photoCount}>{photoCount} 개</Text>
        </View>

        
        <View style={styles.inputSection}>
          <Text style={styles.label}>이름 변경</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="이름 입력"
              value={inputName}
              onChangeText={setInputName}
            />
            <TouchableOpacity style={styles.button} onPress={() => setName(inputName || name)}>
              <Text style={styles.buttonText}>변경</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>사진 변경</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadText}>이미지 업로드</Text>
          </TouchableOpacity>
        </View>

       
        <TouchableOpacity style={styles.resetButton} onPress={resetAppData}>
          <Text style={styles.resetText}>초기화</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    alignItems: "center",
    paddingVertical: 20,
  },
  imageSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    width: 300,
    height: 300,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoContainer: {
    backgroundColor:'white',
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    height:40,
  borderRadius:20,
    alignItems:"center",
    marginBottom: 20,
  },
  photoText: {
    marginLeft:20,
    fontSize: 20,
    fontWeight: "bold",
  },
  photoCount: {
    marginRight:20,
    fontSize: 18,
    color: "#555",
  },
  inputSection: {
    width: "80%",
  
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  uploadButton: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resetButton: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 150,
    borderRadius: 5,
  },
  resetText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});