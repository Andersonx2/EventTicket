import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";

import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import { QrCode } from "@/components/qrcode";
import { Link } from "expo-router";
import { BadgeStore } from "@/store/badge-store";

type Props = {
  data: BadgeStore;
  image?: string;
  onChangeAvatar?: () => void;
  onShowQrCode?: () => void;
};

export function Credential({
  data,
  onChangeAvatar,
  onShowQrCode,
  image,
}: Props) {
  return (
    <View className="w-full self-stretch items-center">
      <Image
        source={require("@/assets/ticket/band.png")}
        className="w-24 h-52 z-10"
      />

      <View className="bg-black/20 self-stretch items-center pb-6s border border-white-10 mx-3 rounded-2x1 -mt-5">
        <ImageBackground
          source={require("@/assets/ticket/header.png")}
          className="px-6 py-8 h-40 items-center self-stretch border-withe/10 overflow-hidden"
        >
          <View className="w-full  flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold ">
              {data.eventTitle}
            </Text>
            <Text className="text-zinc-50 text-sm font-boldclass">
               Codigo: #{ data.id}    </Text>
          </View>
          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {data.image ? (
          <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={onChangeAvatar}>
            <Image
              source={{ uri: data.image }}
              className="w-36 h-36 rounded-full -mt-24"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onChangeAvatar}
            activeOpacity={0.9}
            className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center "
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className="text-zinc-50 text-2x1 mt-4 font-bold">
          {data.name}
        </Text>

        <Text className="font-regular text-base text-zinc-300 mb-4">{data.email} </Text>

        <QrCode value={ data.checkInURL} size={160} />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6"
          onPress={onShowQrCode}
        >
          <Text className="font-body text-orange-500 text-sm mb-8">
            Ampliar imagem
          </Text>
        </TouchableOpacity>
        <Link
          href="/"
          className="text-gray-100 text-base font-bold text-center mb-8"
        >
          Voltar
        </Link>
      </View>
    </View>
  );
}
