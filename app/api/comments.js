import { GraphQLClient, gql } from "graphql-request";
const graphqlApi = process.env.NEXT_PUBLIC_VTECH_ENDPOINT;
const graphcmstoken = process.env.GRAPHCMS_TOKEN;

export default async function handler(req, res) {
    console.log({graphcmstoken}); 
    const graphQLClient = new GraphQLClient((graphqlApi), {
        headers: {
            authorization: `Bearer ${graphcmstoken}`,
        },
    });

    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
            CreateComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) { id }

        }
    `;
    const result = await graphQLClient.request(query, {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        slug: req.body.slug,
      });
    
      return res.status(200).send(result);
}