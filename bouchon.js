// express server listen on port 3000, on route /auth, return a string "abcd1234"
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// bouchon for oauth server return authorization code
dotenv.config();

app.get(process.env.BREAD2_AUTH_URL, (req, res) => {
    console.log("🔥🔥🔥");
    const callback = req.query.redirect_uri;
    res.redirect(callback + "?code=abcd1234");
});

app.listen(3000, () => {
    console.log(`🚀 Server 🍞2 ready at ${process.env.BREAD2_HOST}`);
});
