import gql from "graphql-tag";

const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

const GET_PRODUCTS = gql`
query category($title : String!){
    category(input:{
    title : $title
  }){
    name,
    products{
      name,
      id,
      inStock,
      gallery,
      description,
      category,
      attributes{
        id,
        name,
        type,
        items{
          displayValue,
          value,
          id
        }
      },
      prices{
        currency{
          label,
          symbol
        },
        amount
      },
      brand
    }
  }
}
`;

const GET_CURRENCY_CATEGORY = gql`
  {
    currencies{
      label,
      symbol
    }
  }
`
export { GET_CATEGORIES, GET_PRODUCTS,GET_CURRENCY_CATEGORY };
