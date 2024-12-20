import { Tabs } from "expo-router";
import { Image} from "react-native"

export default function Layout() {
  return (
    
    <Tabs>
      
     
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/Main_icon.png")}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clock"
        options={{
          tabBarLabel: "Clock",
          tabBarIcon: () => (
            <Image
            source={require("../../assets/images/alarm_icon.png")}
              style={{ width: 24, height: 24}}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="plus"
        options={{
          tabBarLabel: "Plus",
          tabBarIcon: () => (
            <Image
            source={require("../../assets/images/plus_icon.png")}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="photo"
        options={{
          tabBarLabel: "Photo",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/album_icon.png")}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="mypage"
        options={{
          tabBarLabel: "My Page",
          tabBarIcon: () => (
            <Image
            source={require("../../assets/images/my_icon.png")}
              style={{ width: 24, height: 24}}
            />
          ),
        }}
      />
    </Tabs>
  );
}