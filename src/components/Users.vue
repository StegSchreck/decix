<template>
  <div id="users">
    <h1>Vue Apollo Integration</h1>

    <h2>Users</h2>
    <div class="users">
      <div v-for="user in allUsers" :class="['user',{optimistic: user.id === -1}]" :title="user.id">
        {{ user.firstName }} {{ user.lastName }} - {{ user.email }}
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'users',
    apollo: {
      allUsers: gql`query {
        allUsers {
          firstName
          lastName
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

  #users {
    max-width: 500px;
    padding: 12px;
    margin: auto;
    text-align: center;
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
</style>
