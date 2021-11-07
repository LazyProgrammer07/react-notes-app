const prod = {
    url: {
     API_URL: "https://notes-api-07.herokuapp.com",
     API_URL_USERS: "https://myapp.herokuapp.com/users"}
   }

const dev = {
    url: {
     API_URL: "http://localhost:3000"
    }
   }

export const config = process.env.NODE_ENV === "development" ? dev : prod
