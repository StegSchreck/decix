import gql from 'graphql-tag'

export const ALL_MATRIXES_QUERY = gql`
  query {
    matrix {
      id
      title
    }
  }`

export const MATRIX_QUERY = gql`
  query Matrix($id: ID!){
    matrix (id: $id){
      id
      title
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
    deleteMatrix(id: $id)
  }`

export const NEW_MATRIX_MUTATION = gql`
  mutation ($title: String!) {
    createMatrix(title: $title) {
      id
    }
  }`

export const CHANGED_MATRIX_SUBSCRIPTION = gql`
  subscription matrix {
    matrixChange {
      id
      title
    }
  }`

export const ALL_ALTERNATIVES_QUERY = gql`
  query {
    alternative {
      id
      title
      sorting
    }
  }`

export const ALTERNATIVE_QUERY = gql`
  query Alternative($id: ID!){
    alternative (id: $id){
      id
      title
      sorting
    }
  }`

export const NEW_ALTERNATIVE_MUTATION = gql`
  mutation ($title: String!, $sorting: Int!) {
    createAlternative(title: $title, sorting: $sorting) {
      id
    }
  }`

export const DELETE_ALTERNATIVE_MUTATION = gql`
  mutation ($id: ID!) {
    deleteAlternative(id: $id)
  }`

export const CHANGED_ALTERNATIVE_SUBSCRIPTION = gql`
  subscription alternative {
    alternativeChange {
      id
      title
      sorting
    }
  }`

export const ALL_CATEGORIES_QUERY = gql`
  query {
    category {
      id
      title
      sorting
      weight
    }
  }`

export const CATEGORY_QUERY = gql`
  query Category($id: ID!){
    category (id: $id){
      id
      title
      sorting
      weight
    }
  }`

export const NEW_CATEGORY_MUTATION = gql`
  mutation ($title: String!, $sorting: Int!) {
    createCategory(title: $title, sorting: $sorting) {
      id
    }
  }`

export const DELETE_CATEGORY_MUTATION = gql`
  mutation ($id: ID!) {
    deleteCategory(id: $id)
  }`

export const CHANGED_CATEGORY_SUBSCRIPTION = gql`
  subscription category {
    categoryChange {
      id
      title
      sorting
      weight
    }
  }`
