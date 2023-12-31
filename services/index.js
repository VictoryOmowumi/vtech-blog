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
          id
          photo {
            url
          }
        }
        categories {
          name
          slug
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
 const  query = gql`
    query GetPostDetails() {
      posts(orderBy: createdAt_DESC last: 3) {

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
  return  result.posts;
    
}

export const getSimilarPosts = async (categories, slug) => {
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
const result = await request(graphqlApi, query, { slug, categories });

return result.posts;
}


export const getCategories = async () => {
  const query = gql`
  query GetCategories {
    categories {
      name
      slug
    }
  }
`;
const result = await request(graphqlApi, query);
return result.categories;
}


export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlApi, query, { slug: slug.toString() });

  return result.post;
};


export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};