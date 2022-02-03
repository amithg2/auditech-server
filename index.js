// require("dotenv").config();
const axios = require("axios");
const express = require("express");
const CommitModel = require("./models/commitModel");
const { sortedFiles } = require("./helpers");
const cors = require("cors");
require("./connectToDB");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/commits/new/:sha", async (req, res) => {
  try {
    const { sha } = req.params;
    const { data } = await axios.get(
      `https://api.github.com/repos/amithg2/github-demo/commits/${sha}`
    );
    const { name, date, email } = data.commit.committer;
    const { message, author } = data.commit;

    const files = sortedFiles(data.files);
    const commit = {
      _id: sha,
      committer: name,
      date: new Date(date),
      message: message,
      email: email,
      isAuthor: name === author.name ? true : false,
    };

    commit.filesAdded = files.filesAdded;
    commit.filesModified = files.filesModified;
    commit.filesRemoved = files.filesRemoved;
    const newCommit = new CommitModel(commit);
    newCommit.save();
  } catch (e) {
    console.log(e);
  }
});

app.get("/commits/all", async (req, res) => {
  try {
    const allCommits = await CommitModel.find();
    res.json({ commits: allCommits });
  } catch (e) {
    console.log(e);
    return res.send("error");
  }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
