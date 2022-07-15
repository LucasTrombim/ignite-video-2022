import { ApolloClient, InMemoryCache } from "@apollo/client"

export const client= new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl5brd8ni0al301us052bchap/master",
  headers: {
    "Authorization": `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`
  },
  cache: new InMemoryCache()
})