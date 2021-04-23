import React, { useState } from 'react';
import {
    SafeAreaView, 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';

import {Button} from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function UserIdentification(){
    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(false);
    const [isFiled, setIsFiled] = useState(false);
    const [name, setName] = useState<string>();

    

    async function handleSubmit() {
        if(!name)
        return Alert.alert('Me diz como chamar você 😥')

        try{
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate("Confirmation", {
                title: 'Prontinho',
                subTitle: 'Agora vamos comecar a cuidar das suas plantas com muito cuidado',
                buttonTitle: 'Comecar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        } catch(e){
            Alert.alert('Não foi possível salvar seu nome. 😥')
        }
        
        
    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFiled(!!name);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value: string){
        setIsFiled(!!value);
        setName(value);
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <View style={styles.header}>
                            <Text style={styles.emoji}>
                                {isFiled ? '😁' : '😊'}
                            </Text>
                            <Text style={styles.title}>Como podemos {'\n'} chamar você?</Text>
                            <TextInput 
                            style={[
                                styles.input,
                                (isFocused || isFiled) && {borderColor: colors.green}
                            ]}
                            placeholder="Digite um nome"
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                            />
                        </View>

                        <View style={styles.footer}>
                        <Button title="Confirmar" onPress={handleSubmit} />
                        </View>
                        
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }
});