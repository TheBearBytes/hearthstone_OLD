import {gql} from "@apollo/client";

export const REGISTER = gql`
    mutation Register(
        $avatar: String
        $username: String
        $email: String!
        $password: String!
        $passwordConfirmation: String!
      ) {
        register(input: {
          avatar: $avatar
          username: $username
          email: $email
          password: $password
          passwordConfirmation: $passwordConfirmation
        })
      }
`;

export const LOGIN = gql`
    mutation Login(
        $email: String!
        $password: String!
      ) {
        login(input: {
          email: $email
          password: $password
        })
      }
`;
