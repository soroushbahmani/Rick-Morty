import { gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query get_characters($index:Int!, $input:String){
    characters(page:$index , filter: { name: $input }) {
        info{
            pages
            }
        results {
            id,
            name,
            status,
            image,
            location {
            name
                }
      }
    
  }
}
`;





const GET_CHARACTER = gql`
query get_character($id:ID!) {
    character(id:$id){
        name,
        image,
        status,
        species,
        type,
        gender,
        location{
            name
        },
}
}
`;

export { GET_CHARACTERS, GET_CHARACTER };
