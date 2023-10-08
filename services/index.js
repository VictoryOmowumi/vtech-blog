import {request, gql} from 'graphql-request';

const graphqlApi = process.env.NEXT_PUBLIC_VTECH_ENDPOINT;
export const getPosts = async () => {
    const query = gql`
    query Assets {
      postsConnection {
        edges {
          node {
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            author {
              bio
              name
              photo {
                url
              }
              id
            }
          }
        }
      }
    }
    `
    const results = await request(graphqlApi, query);

    return results.postsConnection.edges.map((edge) => edge.node);
};

export const getRecentPosts = async () => {
  query = gql`
    query GetPostDetails() {
      posts(orderBy: createdAt_ASC last: 3) {

        title
        featuredImage {
          url
        }
        slug
        createdAt
      }

    } 
  `
  const result = await request(graphqlApi, query);
  return  result.postsConnection.edges.map((edge) => edge.node);
    
}

export const getSimilarPosts = async (category, slug) => {
  const query = gql`
  query GetPostDetails($slug: String!, $categories: [String!]) {
    posts(
      where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
      last: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
`;
const result = await request(graphqlAPI, query, { slug, categories });

return result.postsConnection.edges.map((edge) => edge.node);
}