import { useState } from 'react';
import {
  StatusBar,
  View,
  Alert,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';

import { Header } from '@/components/hearder';
import { Credential } from '@/components/credetial';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { Button } from '@/components/button';
import * as ImagePicker from 'expo-image-picker';
import { QrCode } from '@/components/qrcode';
import { useBadgeStore } from '@/store/badge-store';
import { Redirect } from 'expo-router';

export default function Ticket() {
  const badgeStore = useBadgeStore();
  const [onShowQrCode, setonShowQrCode] = useState(false);


  async function handlesSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.assets) {
        console.log(result.assets);
        badgeStore.updateAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Foto', 'Nao foi possivel selecionar a foto ');
    }
  }

  if(!badgeStore.data?.checkInURL){
    return <Redirect href="/"/>;

  }

 return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />
      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsHorizontalScrollIndicator={false}
      >
        <Credential
          data={badgeStore.data}
          onChangeAvatar={handlesSelectImage}
          onShowQrCode={() => setonShowQrCode(true)}
          
        />

        <FontAwesome
          name="angle-double-down"
          size={24}
          color={colors.gray[300]}
          className="self-center my-6"
        />

        <Text className="text-white font-bold text-2xl mt-4  text-center mb-4">
          Compartilhar a  Credencial
        </Text>

        <Button title="Compartilhar" />

        <TouchableOpacity 
         activeOpacity={0.7} 
         className="mt-10"
         onPress={() => badgeStore.remove()}
         >
          <Text className="text-base text-white font-bold text-center">
            {' '}
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={onShowQrCode} statusBarTranslucent  animationType="slide">
        <View className="flex-1 bg-green-500 items-center justify-center">
  
          <TouchableOpacity  activeOpacity={0.7} onPress={()=>setonShowQrCode(false)}>
          <QrCode value="teste" size={300}/>
            <Text className="font-body text-orange-500 text-sm mt-16 text-center">
              Fechar
            </Text>
          </TouchableOpacity>
        </View>      
      </Modal>
    </View>
  );
}
