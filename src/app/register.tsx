import { View, Image, StatusBar, Alert } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Button } from '@/components/button';
import { useState } from 'react';
import { Link } from 'expo-router';
import {  router } from 'expo-router';

import { Input } from '@/components/input';
import { colors } from '@/styles/colors';

import { api } from '@/server/api';
import axios from 'axios';
import { useBadgeStore } from '@/store/badge-store';

const EVENT_ID = 'fdc06052-5633-4c66-a380-4b32ed2439e9';



export default function Register() {
  const badgeStore = useBadgeStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert('Inscrição', 'Preencha todos os campos');
      }

      setIsLoading(true);

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendaes`, {
        name,
        email
      });

      if (registerResponse.data.attendaeId) {
        const badgeResponse = await api.get(`/attendaes/${registerResponse.data.attendaeId}/badge`);

          badgeStore.save(badgeResponse.data.badge);
        


        Alert.alert('Inscrição:', 'Inscricao realizada com sucesso!', [
          {
            text: 'OK',
            onPress: () => {
              router.push('/ticket');
            }
          }
        ]);
      }
    } catch (error) {
      setIsLoading(false);
      
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (
          String(error.response?.data.menssage).includes('email already exist')
        ) {
          return Alert.alert(
            'Inscrição:',
            'Você ja esta inscrito nesse evento'
          );
        }
      }
      Alert.alert('Inscrição:', 'Não foi possivel realizar a inscrião');
    } 
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center">
      <StatusBar barStyle="light-content" />
      <Image
        source={require('@/assets/logo.png')}
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
          isLoading={isLoading}
        />
      </View>
      <Link
        href="/"
        className="text-gray-200 text-base font-bold text-center mt-8">
        Já possui ingresso?{' '}
      </Link>
    </View>
  );
}
