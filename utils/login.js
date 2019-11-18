import * as Facebook from 'expo-facebook';
import { StyleSheet, Text, View, Button, Alert, TextInput, Json} from 'react-native';

export default class Login {
    logIn = async () => {
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync('2611448455568236', {
          permissions: ['public_profile', "email"],
        });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          let response = await fetch(`https://graph.facebook.com/me?fields=email,name,picture&access_token=${token}`);
          this.json = await response.json();
          console.log("json =", this.json)
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }

}
