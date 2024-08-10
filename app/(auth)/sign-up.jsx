import { Text, View, ScrollView, Image, } from 'react-native'
import React from 'react'
import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import {Link} from 'expo-router'
import { createUser } from '../../lib/appwrite';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalContext } from "../../context/GlobalProvider";


const signUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const router = useRouter();
  const[form, setForm] = useState({
    username:'',
    email:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <SafeAreaView className = "bg-primary h-full">

      <ScrollView>
        <View className ="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source ={images.logo}
            resizeMode = 'contain' className="w-[115px] h-[35px]"
          />

          <Text className ="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to Aora</Text>

          <FormField
            title = "Username"
            value = {form.username}
            handleChangeText ={ (e) => setForm({...form,username:e})}
            otherStyles ="mt-7"
            keyboardType = "email-address"
            placeholder={'Your unique username'}
          />

          <FormField
            title = "Email"
            value = {form.email}
            handleChangeText ={ (e) => setForm({...form,email:e})}
            otherStyles ="mt-7"
            keyboardType = "email-address"
            placeholder={'Your email'}
          />

          <FormField
            title = "Password"
            value = {form.password}
            handleChangeText ={ (e) => setForm({...form,password:e})}
            otherStyles ="mt-7"
            placeholder={'Your password'}
          />

          <CustomButton 
            title ="Sign up"
            handlePress ={submit}
            containerStyles="mt-7"
          />

          <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Already have a account? 
              </Text>
              <Link href ="/sign-in" className='text-lg
               font-psemibold text-secondary
              '>Login</Link>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>

  )
}

export default signUp

