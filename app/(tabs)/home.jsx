import { Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending'

const home = () => {
  return (
    <SafeAreaView className="bg-primary"> 
      <FlatList
        data={[{id:1},{id:2},{id:3}]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={()=>{
          <View className = "my-6 px-4 space-y-6">
            <View className = "justify-between items-start flex-row mb-6">
              <Text className ="font-pmedium text-sm text-gray-100">
                Welcome back
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                XXX
              </Text>
            </View>
            
            <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                  />
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest videos
              </Text>
            </View>

            <Trending />
          </View>
        }}
      />
    </SafeAreaView>
  )
}

export default home

