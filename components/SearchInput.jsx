import { Text, View,TextInput,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from "react";

import {icons} from '../constants'

const SearchInput = (
 { title, value, placeholder, handleChangeText, otherStyles, ...props}
) => {
  const[showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    
      <View className={`w-full h-16 flex-row px-4 bg-black-100 rounded-2xl space-x-4 items-center 
        ${isFocused ? 'border-2 border-secondary' : 'border border-transparent'}
      `}>
        <TextInput
        className=" flex-1 text-white font-pregular text-base mt-0.5"
        value = {value}
        placeholder ={ 'Search for a video title'}
        placeholderTextColor = "#7b7b8b"
        onChangeText = {handleChangeText}
        secureTextEntry = {title === 'Password' && !showPassword}
        selectionColor="#ff9c01"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        />

       <TouchableOpacity>
          <Image source={icons.search}
            className="w-5 h-5"
            resizeMode='contain'
          />
       </TouchableOpacity>
      </View>

  )
}

export default SearchInput