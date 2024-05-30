import { View, Image, StatusBar, Alert } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Button } from '@/components/button';
import { useState } from 'react';
import { Link } from 'expo-router';
import { router } from 'expo-router'; // Corrigido para importar 'router' diretamente
import { Input } from '@/components/input';
import { colors } from '@/styles/colors';
import { api } from '@/server/api';
import axios from 'axios';
import { useBadgeStore } from '@/store/badge-store';
import { BadgeStore } from "@/store/badge-store";

const EVENT_ID = 'fdc06052-5633-4c66-a380-4b32ed2439e9';

export default function Register() {
  const badgeStore = useBadgeStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert('Inscrição Realizada:', 'Preencha todos os campos');
      }

      setIsLoading(true);

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendaes`, {
        name,
        email
      });

      if (registerResponse.data.attendaeId) {
        const attendaeId = registerResponse.data.attendaeId;
        const badgeResponse = await api.get(`/attendaes/${attendaeId}/badge`);

        if (badgeResponse.data.badge) {
          badgeStore.save(badgeResponse.data.badge);
          Alert.alert('Inscrição:', `Seu código é: [#${attendaeId}]`, [
            {
              text: 'OK',
              onPress: () => {
                router.push('/ticket');
              }
            }
          ]);
        } else {
          Alert.alert('Inscrição:', 'Não foi possível obter os dados do badge');
        }
      }
    } catch (error) {
      setIsLoading(false);
      
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (String(error.response?.data.menssage).includes('email already exist')) {
          return Alert.alert('Inscrição:', 'Você já está inscrito neste evento');
        }
      }
      Alert.alert('Inscrição:', 'Não foi possível realizar a inscrição');
    } 
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.green[500], alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('@/assets/logo.png')}
        style={{ height: 100 }}
        resizeMode="contain"
      />

      <View style={{ width: '100%', margin: 12, gap: 3 }}>
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
          title="Realizar inscrição"
          onPress={handleRegister}
          isLoading={isLoading}
        />
      </View>
      <Link
        href="/"
        style={{ color: colors.gray[200], fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 8 }}>
        Já possui ingresso?{' '}
      </Link>
    </View>
  );
}
