<template>
  <div class="text-center q-pa-md flex flex-center">
    <div>
      <div>line login</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
  mounted () {
    let code = this.$route.query.code
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    // let url = "http://localhost:4000/"
    let url = "https://rolling-paper-line-login.herokuapp.com/"
    fetch(url + 'auth?code=' + code, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        debugger
      });

  }
};
</script>
