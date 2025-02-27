import { Button, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function SwitchCheez() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});



  const validationForm = () => {
    const errors: { username?: string; password?: string } = {};
  
    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (username.length <= 8) {
      errors.username = "Username must be more than 8 characters";
    }
  
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length <= 8) {
      errors.password = "Password must be more than 8 characters";
    }
  
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };
  

  const handleSubmit = () => {
    if (validationForm()) {
      setUsername('')
      setPassword('')
      setErrors({})
    }
  

  }



  let imagelink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s"
  return (
    <KeyboardAvoidingView behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} //for space between keyboard and the box


      style={styles.container}>
      <View style={styles.forms}>

        <Image style={styles.image} source={{ uri: imagelink }} />
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} placeholder='enter username' value={username} onChangeText={setUsername} />

        {
          errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null
        }


        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder='enter password' secureTextEntry
          value={password} onChangeText={setPassword} />

        {
          errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null
        }

        <Button title='login' onPress={handleSubmit}/>
      </View>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20

  },
  forms: {
    backgroundColor: 'plum',
    padding: 30,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold"
  },
  input: {
    height: 40,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginBottom: 50
  },
  errorText: {
    // <col />
    color: 'red',
    marginBottom: 10
  }
})