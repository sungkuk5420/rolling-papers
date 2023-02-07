<template>
  <div class="text-center q-pa-md flex flex-center">
  </div>
</template>

<script>
import { getAuth, signInWithCustomToken } from "firebase/auth";

import { uid } from 'quasar'

export default {
  name: "line login",
  beforeMount () {
    let code = this.$route.query.code
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    // let url = "http://localhost:4000/"
    let url = "https://rolling-paper-line-login.herokuapp.com/"
    this.$q.loading.show();
    fetch(url + 'auth?code=' + code, requestOptions)
      .then(response => response.json())
      .then(data => {
        let customToken = data.customToken
        const auth = getAuth();
        signInWithCustomToken(auth, customToken)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            this.$q.loading.hide();
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            // ...
          });
      });





  }
};
</script>
