import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as firebase from 'firebase';
require("firebase/firestore");

export default class Database  {
    constructor() {
        // Initialize Firebase
        this.firebaseConfig = {
            apiKey: "AIzaSyBphJzFqoU1226G6k-osgkkSibiHD8Cf50",
            authDomain: "peerwalk-56316.firebaseapp.com",
            databaseURL: "https://peerwalk-56316.firebaseio.com",
            projectId: "peerwalk-56316",
            storageBucket: "peerwalk-56316.appspot.com",
            messagingSenderId: "530706802982",
            appId: "1:530706802982:web:a191560b555d13569479e7",
            measurementId: "G-9NMGPWMGEB"
        };
        firebase.initializeApp(this.firebaseConfig);
        this.state = {
            isReady: false
        };
    }


    createWalk = (data) => {
        // let newDate: firebase.firestore.Timestamp.fromDate(data[date]);
        // delete data[date];
        // data[date] = newDate;
        let setDoc = this.db.collection('walks').add(data);
        Alert.alert('Walk created successfully!');

        // TODO: Update new walk ID to other collections
    };
    db = firebase.firestore();
    joinWalk = (userID, walkID) => {
        const user = db.collection("user").doc(userID);
        let getDoc = user.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    let data = doc.data();
                    let walksArr = data["Walks"];
                    walksArr.push(walkID);
                    console.log("walkID pushed: ", walkID);
                    doc.set({Walks: walksArr}, {merge: true});
                    console.log("Document successfully received!");
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        const walk = db.collection("walks").doc(walkID);
        let walkDoc = walk.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    let data = doc.data();
                    let walksArr = data["Walkers"];
                    walksArr.push(userID);
                    console.log("userID pushed: ", userID)
                    doc.set({Walkers: walksArr}, {merge: true});
                    console.log("Document successfully received!");
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    leaveWalk =(userID, walkID) => {
        const user = db.collection("user").doc(userID);
        let getDoc = user.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    let data = doc.data();
                    let walksArr = data["Walks"];
                    delete walksArr[walkID];
                    console.log("walkID pushed: ", walkID)
                    doc.set({Walks: walksArr}, {merge: true});
                    console.log("Document successfully received!");
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    getNearbyWalks = (location) => {
        // From location get a list of 10 nearby walks with a radius of 5

        const walk = db.collection("walks");
        let getDoc = walk.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    return doc.data()
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    getUserWalkIDs = (userID) => {
        const user = db.collection("user").doc(userID);
        let getDoc = user.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    let data = doc.data();
                    console.log("Document successfully received!");
                    return data["walks"]
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    getWalk = (walkID) => {
        const walk = db.collection("walks").doc(walkID);
        let getDoc = walk.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    return doc.data()
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    getProfile = (userID) => {
        const user = db.collection("users").doc(userID);
        let getDoc = user.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    return doc.data()
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
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

