import {Button, Text, View} from "react-native";
import Database from "./database";

// Add all this under render()

const db = new Database();
return (
    <View style={styles.container}>
        <Text>This is just a test!</Text>
        <Button
            title="Facebook Login"
            onPress={() => this.logIn()}
        />
        <Button
            title="Get Firebase Question"
            onPress={() => db.firebaseGetQuestionInfo()}
        />
        <Button
            title="Add Firebase Question"
            onPress={() => db.firebaseAddQuestion({
                email: 'reinaw1012@berkeley.edu',
                question: 'where am I?',
                location: 'Berkeley',
                answers: [],
                tags: []
            })}
        />
        <Button
            title="Edit Firebase Question"
            onPress={() => db.firebaseEditQuestion({question: "what should my new question be?"})}
        />
        <Button
            title="Get Firebase Answer"
            onPress={() => db.firebaseGetAnswerFromQID("EXWNJHch99dJ85xSfOVd")}
        />
        <Button
            title="Add Firebase Answer"
            onPress={() => db.firebaseAddAnswer({
                email: 'reinaw1012@berkeley.edu',
                answer: 'Berkeley',
                likes: 5,
                question: 'xJ3Uu9csWZLIodX2wJB8'})}
        />
        <Button
            title="Edit Firebase Answer"
            onPress={() => db.firebaseEditAnswer({answer: "not reina or tejvir"})}
        />
        <Button
            title="Get Firebase User Info"
            onPress={() => db.firebaseGetUserFromUID("user1")}
        />
        <Button
            title="Set Firebase User Info"
            onPress={() => db.firebaseSetUser({
                email: 'reinaw1012@berkeley.edu',
                firstName: 'Reina',
                lastName: 'Wang',
                location: 'Berkeley',
                password: '654321',
                profilePic: 'image-encoding',
                answers: [],
                submittedQuestions: [],
                viewedQuestions: []
            })}
        />
        <Button
            title="Edit Firebase User Info"
            onPress={() => db.firebaseEditUserInfo({location: 'Taiwan'})}
        />
    </View>
);




import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as firebase from 'firebase';
require("firebase/firestore");

export default class Database  {
        constructor() {
                // Initialize Firebase
                this.firebaseConfig = {
                        apiKey: "AIzaSyBgta2Y9ETxTvg-3UoprSbKcpZviQHUo28",
                        authDomain: "questionairea-ed546.firebaseapp.com",
                        databaseURL: "https://questionairea-ed546.firebaseio.com",
                        projectId: "questionairea-ed546",
                        storageBucket: "questionairea-ed546.appspot.com/"
                };
                firebase.initializeApp(this.firebaseConfig);
                this.state = {
                        isReady: false
                };
        }

        firebaseLogIn = (loginData) => {
                const db = firebase.firestore();
                let users = db.collection('users');
                let queryEmail = users.where('email', '==', loginData["email"]).get()
                    .then(snapshot => {
                            if (snapshot.empty) {
                                    console.log('No user found with the email', loginData["email"]);
                                    return;
                            }
                            snapshot.forEach(doc => {
                                    const data = doc.data();
                                    if (loginData.password == data.password) {
                                            console.log("Log in successful!");
                                            const returnValue =  {
                                                    userID: doc.id,
                                                    email: data["email"],
                                                    firstName: data["firstName"],
                                                    lastName: data["lastName"],
                                                    location: data["location"]
                                            }
                                            console.log("returnValue: ", returnValue)
                                            return returnValue;
                                    } else {
                                            console.log('Incorrect password, you entered ', loginData["password"], 'but stored password is ', data['password'])
                                    }
                            });
                    })
                    .catch(err => {
                            console.log('Error getting documents', err);
                    });
        }

        firebaseGetAnswerFromQID = (QID) => {
                const db = firebase.firestore();
                const answers = db.collection("answers");
                let queryAnswers = answers.where('question', '==', QID).get()
                    .then(snapshot => {
                            if (snapshot.empty) {
                                    console.log('No answers found with the Question ID: ', QID);
                                    return;
                            }
                            snapshot.forEach(doc => {
                                    const data = doc.data();
                                    const returnValue =  {
                                            answerID: doc.id,
                                            answer: data["answer"],
                                            firstName: data["firstName"],
                                            likes: data["likes"],
                                            submissionTime: data["submissionTime"]
                                    }
                                    console.log("returnValue: ", returnValue)
                                    return returnValue;
                            });
                    })
                    .catch(err => {
                            console.log('Error getting documents', err);
                    });
        }

        firebaseGetQIDFromAID = (answerID) => {
                const db = firebase.firestore();
                const questions = db.collection("questions");
                let queryQuestions = questions.where('answers', 'array-contains', answerID).get()
                    .then(snapshot => {
                            if (snapshot.empty) {
                                    console.log('No question found with the answer ID: ', answerID);
                                    return;
                            }
                            snapshot.forEach(doc => {
                                    console.log("QuestionID: ", doc.id);
                                    return doc.id;
                            });
                    })
                    .catch(err => {
                            console.log('Error getting documents', err);
                    });
        }

        firebaseAddQuestion = (data) => {
                const db = firebase.firestore();
                let FieldValue = firebase.firestore.FieldValue;
                data.submissionTime = FieldValue.serverTimestamp();
                let setDoc = db.collection('questions').add(data);
                Alert.alert('Question added successfully!');
        }

        firebaseEditQuestion = (data) => {
                const db = firebase.firestore();
                let FieldValue = firebase.firestore.FieldValue;
                data.submissionTime = FieldValue.serverTimestamp();
                let setDoc = db.collection('questions').doc('EXWNJHch99dJ85xSfOVd');
                let updateSingle = setDoc.update(data);
                Alert.alert('Question edited successfully!');
        }

        firebaseEditAnswer = (data) => {
                const db = firebase.firestore();
                let FieldValue = firebase.firestore.FieldValue;
                data.submissionTime = FieldValue.serverTimestamp();
                let setDoc = db.collection('answers').doc('oWb6yYVskdxHVS5NzE5s');
                let updateSingle = setDoc.update(data);
                Alert.alert('Answer edited successfully!');
        }

        firebaseAddAnswer = (data) => {
                const db = firebase.firestore();
                let FieldValue = firebase.firestore.FieldValue;
                data.submissionTime = FieldValue.serverTimestamp();
                let setDoc = db.collection('answers').add(data);
                Alert.alert('Answer added successfully!');
        }

        firebaseSetUser = (data) => {
                const db = firebase.firestore();
                if (data.password == data.confirmPassword) {
                        delete data.confirmPassword;
                        let setDoc = db.collection('users').add(data);
                        Alert.alert('User info set successfully!');
                        return data;
                } else {
                        Alert.alert("Passwords do not match!")
                }
        }

        firebaseEditUserInfo = (data) => {
                const db = firebase.firestore();
                let setDoc = db.collection('users').doc('OrVz8EizoBN1kcFQ0Bcy');
                let updateSingle = setDoc.update(data);
                Alert.alert('User info edited successfully!');
        }

        firebaseGetUserFromUID = (userID) => {
                const db = firebase.firestore();
                const user = db.collection("users").doc(userID);
                const getDoc = user.get()
                    .then(doc => {
                            if (!doc.exists) {
                                    Alert.alert('No such document!');
                            } else {
                                    const data = doc.data();
                                    // this.setState({documentData: data})
                                    console.log('Email:', data["email"]);
                                    console.log('First Name:', data["firstName"]);
                                    console.log('Last Name:', data["lastName"]);
                                    console.log('Location:', data["location"]);
                                    console.log('Password:', data["password"]);
                                    console.log('Profile Pic:', data["profilePic"]);
                                    for (let i = 0; i < data["answers"].length; i++) {
                                            const answerFetch = data["answers"][i].get()
                                                .then(ans => {
                                                        if (!ans.exists) {
                                                                Alert.alert('No answer provided!');
                                                        } else {
                                                                const answer = ans.data();
                                                                console.log('Answers:', answer["answer"]);
                                                        }
                                                })
                                                .catch(err => {
                                                        console.log('Answer fetch error:', err);
                                                        Alert.alert('Error getting answer');
                                                })
                                    }
                                    for (let i = 0; i < data["submittedQuestions"].length; i++) {
                                            const questionFetch = data["submittedQuestions"][i].get()
                                                .then(q => {
                                                        if (!q.exists) {
                                                                Alert.alert('No questions submitted!');
                                                        } else {
                                                                const question = q.data();
                                                                console.log('Submitted question:', question["question"]);
                                                        }
                                                })
                                                .catch(err => {
                                                        console.log('Submitted questions fetch error:', err);
                                                        Alert.alert('Error getting submitted questions');
                                                })
                                    }
                                    for (let i = 0; i < data["viewedQuestions"].length; i++) {
                                            const questionFetch = data["viewedQuestions"][i].get()
                                                .then(q => {
                                                        if (!q.exists) {
                                                                Alert.alert('No questions submitted!');
                                                        } else {
                                                                const question = q.data();
                                                                console.log('Viewed question:', question["question"]);
                                                        }
                                                })
                                                .catch(err => {
                                                        console.log('Viewed questions fetch error:', err);
                                                        Alert.alert('Error getting viewed questions');
                                                })
                                    }
                                    Alert.alert('Document data received');
                            }
                    })
                    .catch(err => {
                            console.log('Document error:', err);
                            Alert.alert('Error getting document');
                    });
        }

        firebaseGetQuestionInfo = () => {
                const db = firebase.firestore();
                const question = db.collection("questions").doc("EXWNJHch99dJ85xSfOVd");
                const getDoc = question.get()
                    .then(doc => {
                            if (!doc.exists) {
                                    Alert.alert('No such document!');
                            } else {
                                    const data = doc.data();
                                    // this.setState({documentData: data})
                                    console.log('Question:', data["question"]);
                                    console.log('Email:', data["email"]);
                                    console.log('Submission time:', data["submissionTime"].toDate());
                                    for (let i = 0; i < data["answers"].length; i++) {
                                            const answerFetch = data["answers"][i].get()
                                                .then(ans => {
                                                        if (!ans.exists) {
                                                                Alert.alert('No answer provided!');
                                                        } else {
                                                                const answer = ans.data();
                                                                console.log('Answers:', answer["answer"]);
                                                        }
                                                })
                                                .catch(err => {
                                                        console.log('Answer fetch error:', err);
                                                        Alert.alert('Error getting answer');
                                                })
                                    }
                                    Alert.alert('Document data received');
                            }
                    })
                    .catch(err => {
                            console.log('Document error:', err);
                            Alert.alert('Error getting document');
                    });
        }

}

