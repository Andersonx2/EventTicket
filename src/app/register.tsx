import { View, Image, StatusBar, Alert } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Button } from "@/components/button";
import { useState } from "react";
import { Link } from "expo-router";
import { ExpoRoot, router } from "expo-router";

import { Input } from "@/components/input";
import { colors } from "@/styles/colors";

import { api } from "@/server/api";
import axios from "axios";


const EVENT_ID = "5f731e56-22d2-4b36-9e55-8f3082c23992"


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert("Inscrição", "Preencha todos os campos");
      }
      setIsLoading(true);


     const registerResponse = await api.post(`"/events/${EVENT_ID}/attendees"`, {
        name,
        email,
      });

      if(registerResponse.data.attendaeId){
        Alert.alert("Inscrição:", "inscricao realizada com sucesso!",[
          {
            text: "OK",
            onPress: () => {
              router.push("/ticket");
            },
          },
        ])

      }
    } catch (error) {
      console.log(error);

     
       if(axios.isAxiosError(error)){ 
          if(String(error.response?.data.mensage).includes("alredy registered")){ 
            return Alert.alert("Inscrição:", "Este email ja esta cadastrado")
          }
       }

      Alert.alert("Inscrição:", "Não foi possivel realizar a inscrição");
    } finally{
      setIsLoading(false);
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
          <FontAwesome6 name="user-circle" color={colors.gray[200]} size={20} />

          <Input.Field placeholder="Nome Completo" onChangeText={setName} />
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

        <Button
          title="Realizar inscricao"
          onPress={handleRegister}
          isLoading={false}
        />
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
