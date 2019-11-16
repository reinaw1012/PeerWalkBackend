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
