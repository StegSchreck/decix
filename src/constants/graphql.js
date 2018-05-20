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
        description
        sorting
        weight
      }
      alternatives {
        id
        title
        description
        sorting
        entries {
          value
        }
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
        description
        sorting
        weight
      }
      alternatives {
        id
        title
        description
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
  mutation ($title: String!, $description: String!, $sorting: Int!, $matrixID: ID!) {
    createAlternative (title: $title, description: $description, sorting: $sorting, matrixID: $matrixID) {
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
  mutation ($title: String!, $description: String!, $sorting: Int!, $weight: Int!, $matrixID: ID!) {
    createCategory (title: $title, description: $description, sorting: $sorting, weight: $weight, matrixID: $matrixID) {
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

export const ALL_ENTRIES_QUERY = gql`
  query {
    entry {
      id
      value
      comment
      categories {
        id
        title
        description
        sorting
        weight
      }
      alternatives {
        id
        title
        description
        sorting
      }
    }
  }`

export const ENTRY_QUERY = gql`
  query Entry ($id: ID!){
    entry (id: $id){
      id
      value
      comment
      categories {
        id
        title
        description
        sorting
        weight
      }
      alternatives {
        id
        title
        description
        sorting
      }
    }
  }`

export const NEW_ENTRY_MUTATION = gql`
  mutation ($value: String!, $comment: String!, $alternativeID: ID!, $categoryID: ID!) {
    createEntry (value: $value, comment: $comment, alternativeID: $alternativeID, categoryID: $categoryID) {
      id
    }
  }`

export const DELETE_ENTRY_MUTATION = gql`
  mutation ($id: ID!) {
    deleteEntry (id: $id)
  }`

export const CHANGED_ENTRIES_SUBSCRIPTION = gql`
  subscription entry {
    entriesChange {
      id
      value
      comment
      categories {
        id
        title
        description
        sorting
        weight
      }
      alternatives {
        id
        title
        description
        sorting
      }
    }
  }`
