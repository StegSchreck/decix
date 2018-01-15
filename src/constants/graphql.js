import gql from 'graphql-tag'

export const ALL_MATRIXES_QUERY = gql`
  query {
    matrix {
      id
      title
      description
    }
  }`

export const MATRIX_QUERY = gql`
  query Matrix ($id: ID!){
    matrix (id: $id){
      id
      title
      description
      categories {
        id
        title
        sorting
        weight
      }
      alternatives {
        id
        title
        sorting
      }
    }
  }`

export const DELETE_MATRIX_MUTATION = gql`
  mutation ($id: ID!) {
    deleteMatrix (id: $id)
  }`

export const NEW_MATRIX_MUTATION = gql`
  mutation ($title: String!) {
    createMatrix (title: $title) {
      id
    }
  }`

export const CHANGED_MATRIXES_SUBSCRIPTION = gql`
  subscription matrix {
    matrixesChange {
      id
      title
      description
    }
  }`

export const CHANGED_MATRIX_SUBSCRIPTION = gql`
  subscription matrix ($id: ID!) {
    matrixChange (id: $id) {
      id
      title
      description
      categories {
        id
        title
        sorting
        weight
      }
      alternatives {
        id
        title
        sorting
      }
    }
  }`

export const ALL_ALTERNATIVES_QUERY = gql`
  query {
    alternative {
      id
      title
      description
      sorting
    }
  }`

export const ALTERNATIVE_QUERY = gql`
  query Alternative ($id: ID!){
    alternative (id: $id){
      id
      title
      description
      sorting
      matrix {
        id
        title
      }
    }
  }`

export const NEW_ALTERNATIVE_MUTATION = gql`
  mutation ($title: String!, $sorting: Int!, $matrixID: ID!) {
    createAlternative (title: $title, sorting: $sorting, matrixID: $matrixID) {
      id
    }
  }`

export const DELETE_ALTERNATIVE_MUTATION = gql`
  mutation ($id: ID!) {
    deleteAlternative (id: $id)
  }`

export const CHANGED_ALTERNATIVES_SUBSCRIPTION = gql`
  subscription alternative {
    alternativesChange {
      id
      title
      description
      sorting
    }
  }`

export const ALL_CATEGORIES_QUERY = gql`
  query {
    category {
      id
      title
      description
      sorting
      weight
    }
  }`

export const CATEGORY_QUERY = gql`
  query Category ($id: ID!){
    category (id: $id){
      id
      title
      description
      sorting
      weight
      matrix {
        id
        title
      }
    }
  }`

export const NEW_CATEGORY_MUTATION = gql`
  mutation ($title: String!, $sorting: Int!, $matrixID: ID!) {
    createCategory (title: $title, sorting: $sorting, matrixID: $matrixID) {
      id
    }
  }`

export const DELETE_CATEGORY_MUTATION = gql`
  mutation ($id: ID!) {
    deleteCategory (id: $id)
  }`

export const CHANGED_CATEGORIES_SUBSCRIPTION = gql`
  subscription category {
    categoriesChange {
      id
      title
      description
      sorting
      weight
    }
  }`
