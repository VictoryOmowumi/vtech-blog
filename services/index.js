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
}
