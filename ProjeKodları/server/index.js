const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// MongoDB Schemas
const User = require("./Models/User");
const Video = require("./Models/Video");

// Middlewares
app.use(express.json());
app.use(cors());

const PORT = 3000;

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/MyEduDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected")).catch((err) => console.log("MongoDB Connection Error: ", err));

// Register
app.post("/api/register", async (req, res) => {
    const { email, username, password } = req.body;

    try{
        newUser = new User({ username, email, password});
        await newUser.save();
        res.status(200).json( {message: "(My) User Registered to MongoDB"} );
    } catch (err) {
        res.status(400).json( {message: `(My) An Error Occured While Registiration ${err.message}` } )
    } 
});

// Login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if (!user){
            return res.status(400).json({ error: "(My) User Not Found" });
        }
        if (user.password !== password){
            return res.status(400).json( { error: "(My) Password Does Not Match The Email" } );
        }
        return res.status(200).json( {message: "Log-in Success", user: {email: user.email, username: user.username}} );
    } catch (err) {
        console.log("(My)" + err.nessage);
        return res.status(500).json( { error: "(My)" + err.message } );
    }

});

// Upload Video
app.post("/api/video", async (req, res) => {
    let {url, title, description, author, category } = req.body;

    url = url.substring(url.indexOf("=") + 1);
    url = `https://www.youtube.com/embed/${url}`;

    const date = new Date();
    const formatted = date.toLocaleDateString("tr-TR");
    try{
        const newVideo = new Video({ url, title, description, category, author, date: formatted });
        await newVideo.save();
        res.status(200).json( {message: "(My) Video Uploaded Successfully"} );
    } catch (err) {
        res.status(400).json( {message: `(My) An Error Occured While Uploading Video ${err.message}`} );
    }
});

// Fetch Videos
app.get("/api/video", async (req, res) => {
    
    try{
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        req.status(500).json( {message: "(My)" + err.message} );
    }
});

// Fetch Video By ID
app.get("/api/video/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const video = await Video.findById(id);
        res.json(video);
    } catch (err) {
        req.status(500).json( {message: "(My)" + err.message} );
    }
});

// Post Comment
app.post("/api/video/:id/comments", async (req, res) => {
    const { id } = req.params;
    const { user, text } = req.body;

    try{
        const video = await Video.findById(id);

        if (!video) return res.status(404).json( {error: "Video not found"} );

        video.comments.push({ user, text });


        await video.save();
        res.status(201).json({ message: "Commend added Successfully" });
    } catch (err) {

        res.status(500).json({ error: ("My") + err.message} );
    }
})

// Fetch Comments
app.get("/api/video/:id/comments", async (req, res) => {
    const { id } = req.params;

    try{
        const video = await Video.findById(id);
        res.json(video.comments);
    } catch (err) {
        res.status(500).json({ error: ("My") + err.message} );
    }
})

// Post Like
app.post("/api/video/:id/like", async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;

    try{
        const video = await Video.findById(id);

        if (!video) return res.status(404).json( {error: "Video not found"} );

        video.likes.push({ user });
        video.likeTotal++;

        await video.save();

        res.status(201).json({ message: "Liked Successfully" });
    } catch (err) {
        res.status(500).json({ error: ("My") + err.message} );
    }
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
})