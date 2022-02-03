const mongoose = require("mongoose");

const CommitSchema = mongoose.Schema({
  _id: String,
  committer: {
    type: String,
    required: true,
  },
  date: Date,
  message: String,
  email: String,
  isAuthor: Boolean,
  filesAdded: [{ fileName: String, fileUrl: String }],
  filesRemoved: [{ fileName: String, fileUrl: String }],
  filesModified: [{ fileName: String, fileUrl: String }],
});

const DataModel = mongoose.model("CommitSchema", CommitSchema);
module.exports = DataModel;
