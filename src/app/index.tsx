
import { View, Image, StatusBar, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '@/components/button';
import { useState } from 'react';
import { Link , Redirect} from 'expo-router';
import { Input } from '@/components/input';
import { colors } from '@/styles/colors';
import { api } from '@/server/api';
import { useBadgeStore } from '@/store/badge-store';

export default function Home() {
  const badgeStore = useBadgeStore();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log('dados=>', badgeStore.data);

  async function handleAccessCredenciall() {
    try {
      if (!code) {
        return Alert.alert('Credencial', 'Informe o codigo do ingresso! ');
      }
      setIsLoading(true);
      const { data } = await api.get(`/attendaes/${code}/badge`);
      console.log(data.badge);

      badgeStore.save(data.badge);

    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert('Ingresso', 'Ingresso nao realizado!');
    }
  }
  if(badgeStore.data?.checkInURL) { 
    return <Redirect href="/ticket"/>;
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

        <Button
          title="Cadastrar ingresso"
          onPress={handleAccessCredenciall}
          isLoading={isLoading}
        />

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
