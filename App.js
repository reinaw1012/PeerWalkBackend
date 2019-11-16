import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import * as Facebook from 'expo-facebook';
import Database from "./utils/database";


export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailText: "reinaw1012@berkeley.edu",
            passwordText: "654321",
            userData: {}
        };
    }
    db = new Database();
    logIn = async (data) => {
        console.log(data);
        const userData = new Promise(this.db.firebaseLogIn(data))
            .then(
                this.setState({userData: userData})
            )
        console.log("state userData: ", this.state.userData);
        console.log("======================");
        // TODO: Load main page here
    }

    FBlogIn = async () => {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('574225526681876', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!');
            } else {
                // type === 'cancel'
                Alert.alert("type==cancel :(");
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Login Page!</Text>
                <Button
                    title="Edit Firebase Question"
                    onPress={() => db.joinWalk("sbanka@berkeley.edu","dCjQm6tEWiM5P1Wp7Y3Q")}
                />
                <TextInput
                    style={{margin: 20, height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                    placeholder = "Enter email here"
                    onChangeText={(emailText) => this.setState({emailText})}
                    value={this.state.emailText}
                />
                <TextInput
                    style={{margin: 20, height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                    placeholder = "Enter password here"
                    onChangeText={(passwordText) => this.setState({passwordText})}
                    value={this.state.passwordText}
                />
                <Button
                    style={{margin: 20, borderColor: 'blue', borderWidth: 1}}
                    title="Login with email"
                    onPress={() => this.logIn({
                        email: this.state.emailText,
                        password: this.state.passwordText
                    })}
                />
                <Button
                    style={{margin: 20, borderColor: 'blue', borderWidth: 1}}
                    title="Facebook Login"
                    onPress={() => this.FBlogIn()}
                />
                <Text style={{paddingTop: 50}} onPress={() => navigate('Profile', {name: 'Jane'})}>No Questionairea account? Sign up here!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
