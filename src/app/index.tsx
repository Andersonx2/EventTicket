import { View, Image, StatusBar, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@/components/button";
import { useState } from "react";

import { Link } from "expo-router";

import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { ExpoRoot } from "expo-router";


export default function Home() {
  const [code, setCode] = useState("");
  
  function handleAccessCredenciall() {
    if (!code) {
      return Alert.alert("Credencial", "Informe o codigo do ingresso! ");
    }
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center">
      <StatusBar barStyle="light-content" />
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />

      <View className="w-full m-12 gap-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.gray[200]}
            size={20}
          />
          
          <Input.Field
            placeholder="Código do ingresso"
            onChangeText={setCode}
          />
        </Input>

        <Button title="Cadastrar ingresso" onPress={handleAccessCredenciall} />

        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda nao possui ingresso?
        </Link>
      </View>
    </View>
  );
}
