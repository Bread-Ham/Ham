import { ApolloServer } from "@apollo/server"; // preserve-line
// import { startStandaloneServer } from "@apollo/server/standalone"; // preserve-line
// import { typeDefs } from "./schema.js";
// import { resolvers } from "./resolvers.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { expressMiddleware } from "@apollo/server/express4";
// charge env variables
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
    const app = express();

    // Initialize server graphql
    // const server = new ApolloServer({ typeDefs, resolvers });
    // await server.start();

    app.use(cookieParser("mysecret"));

    // Enable CORS for the app URL
    const corsOptions = {
        origin: process.env.BREAD1_HOST || process.env.BREAD2_HOST,
        credentials: true,
    };

    app.use(cors(corsOptions));

    const redirect_endpoint = "/callback";

    app.get("/login", (req, res) => {
        console.log("🔥😅");
        // return string url BREAD2_AUTH_URL
        res.send(
            process.env.BREAD2_HOST +
                process.env.BREAD2_AUTH_URL +
                "?client_id=" +
                process.env.BREAD2_CLIENT_ID +
                "&redirect_uri=" +
                encodeURIComponent(
                    "localhost:4000" +
                        redirect_endpoint +
                        "&response_type=code&scope=openid"
                )
        );
    });

    app.get(redirect_endpoint, async (req, res) => {
        // get authorization code from query
        const code = req.query.code;

        try {
            // Exchange the authorization code for an access token
            const tokenResponse = await axios.post(
                process.env.BREAD2_HOST + process.env.BREAD2_TOKEN_URL,
                querystring.stringify({
                    code: code,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    // redirect_uri: BREAD1_REDIRECT_URI,
                    grant_type: "authorization_code",
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const accessToken = tokenResponse.data.access_token;

            // You can now use the access token to access protected resources
            // For example, you might want to store it in a session or database
            // res.json({ accessToken }); // Send the access token back to the client

            // Redirect the user to a success page or dashboard
            res.redirect(process.env.BREAD1_REDIRECT_URI);
        } catch (error) {
            console.error("Error exchanging code for token:", error);
            res.status(500).send("Authentication failed");
        }
    });

    // add the ApolloServer to the Express app
    // app.use(
    //     "/graphql",
    //     express.json(),
    //     expressMiddleware(server, {
    //         context: ({ req }) => {
    //             return { authentificated: req.authentificated };
    //         },
    //     })
    // );

    // Start the Express server
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server 🥩 ready at http://localhost:${PORT}`);
    });
};

startServer();
