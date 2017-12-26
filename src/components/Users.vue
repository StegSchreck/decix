<template>
  <div id="apollo">
    <h1>Vue Apollo Integration</h1>

    <h2>Users</h2>
    <div class="users">
      <div v-for="user in allUsers" :class="['user',{optimistic: user.id === -1}]" :title="user.id">
        {{ user.email }}
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'apollo',
    apollo: {
      allUsers: gql`query {
        allUsers {
          email
        }
      }`
    },

    data () {
      return {
        allUsers: []
      }
    }
  }
</script>

<style>
  body, input {
    font-family: Helvetica, sans-serif;
    font-size: 12pt;
  }

  #apollo {
    max-width: 500px;
    padding: 12px;
    margin: auto;
    text-align: center;
  }

  .info,
  .loading {
    color: #999;
    margin: 12px;
  }

  .user {
    display: inline-block;
    padding: 4px;
    background: #40b883;
    color: white;
    border-radius: 2px;
    margin: 2px;
  }

  .user.optimistic {
    background: #b76c40;
  }

  form {
    margin: 22px;
  }

  input {
    padding: 8px;
    border: solid 1px #bbb;
    border-radius: 2px;
  }

  input:focus {
    box-shadow: none;
    outline: none;
    border-color: #40b883;
  }

  .user-list {
    text-align: left;
    border: solid 1px #40b883;
    padding: 10px;
    border-radius: 3px;
  }

  .actions {
    text-align: center;
  }
</style>
