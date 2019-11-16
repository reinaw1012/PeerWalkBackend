import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import Database from "./utils/database";


export default class SignUpScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailText: "sbanka@berkeley.edu",
            passwordText: "12345",
            confirmPasswordText: "12345",
            firstName: "Saurav",
            lastName: "Banka",
            location: "Berkeley",
        };
    }
    db = new Database();
    signUp = async (data) => {
        const userData = await this.db.firebaseSetUser(data);
        this.setState({userData: userData});
        console.log("this.state.userData: ", this.state.userData);
        console.log("======================");
        // TODO: Load main page here with userData
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Sign Up Page!</Text>
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
                <TextInput
                    style={{margin: 20, height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                    placeholder = "Confirm password:"
                    onChangeText={(passwordText) => this.setState({passwordText})}
                    value={this.state.confirmPasswordText}
                />
                <TextInput
                    style={{margin: 20, height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                    placeholder = "First Name:"
                    onChangeText={(firstName) => this.setState({firstName})}
                    value={this.state.firstName}
                />
                <TextInput
                    style={{margin: 20, height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                    placeholder = "Last Name:"
                    onChangeText={(lastName) => this.setState({lastName})}
                    value={this.state.lastName}
                />
                <Button
                    style={{margin: 20, borderColor: 'blue', borderWidth: 1}}
                    title="Sign Up!"
                    onPress={() => this.signUp({
                        email: this.state.emailText,
                        password: this.state.passwordText,
                        confirmPassword: this.state.confirmPasswordText,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        submittedQuestions: [],
                        viewedQuestions: [],
                        answers: []
                    })}
                />
            </View>
        )
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
