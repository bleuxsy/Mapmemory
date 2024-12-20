import { Stack ,Tabs} from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
     
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      
      <Stack.Screen name="africamap" options={{ title: "Africa Map" }} />
      <Stack.Screen name="asiamap" options={{ title: "Asia Map" }} />
      <Stack.Screen name="europemap" options={{ title: "Europe Map" }} />
      <Stack.Screen name="oceaniamap" options={{ title: "Oceania Map" }} />
      <Stack.Screen
        name="northamericamap"
        options={{ title: "North America Map" }}
      />
      <Stack.Screen
        name="southamericamap"
        options={{ title: "South America Map" }}
      />
    </Stack>

  );
}