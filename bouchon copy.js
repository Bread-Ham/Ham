// express server listen on port 3000, on route /auth, return a string "abcd1234"
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// bouchon for oauth server return authorization code
dotenv.config();

app.get("/", (req, res) => {
    console.log("🎵🎵🎵");

    res.send("🎵 HELLOOOOOO!🎵");
});

app.listen(8080, () => {
    console.log(`🚀 Server 🍞1 ready at ${process.env.BREAD2_HOST}`);
});
