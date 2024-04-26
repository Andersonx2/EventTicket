import { View, Image, StatusBar, Alert } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Button } from "@/components/button";
import { useState } from "react";
import { Link } from "expo-router";
import { ExpoRoot, router} from "expo-router";

import { Input } from "@/components/input";
import { colors } from "@/styles/colors";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleRegister() {
    if (!name.trim() || !email.trim()) {
      return Alert.alert("Inscrição", "Preencha todos os campos");
    }

    router.push("/ticket")
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
          <FontAwesome6 
           name="user-circle" 
           color={colors.gray[200]} 
           size={20} />

          <Input.Field 
           placeholder="Nome Completo" 
           onChangeText={setName} />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.gray[200]}
            size={20}
          />
          <Input.Field
            placeholder="Digite seu E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>

        <Button title="Realizar inscricao" onPress={handleRegister} />
      </View>
      <Link
        href="/"
        className="text-gray-200 text-base font-bold text-center mt-8"
      >
        Já possui ingresso?{" "}
      </Link>
    </View>
  );
}
