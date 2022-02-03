const sortedFiles = (files) => {
  const filesAdded = [];
  const filesModified = [];
  const filesRemoved = [];
  files.forEach((file) => {
    switch (file.status) {
      case "modified":
        filesModified.push({
          fileName: file.filename,
          fileUrl: file.blob_url,
        });
        break;
      case "added":
        filesAdded.push({
          fileName: file.filename,
          fileUrl: file.blob_url,
        });
        break;
      case "removed":
        filesRemoved.push({
          fileName: file.filename,
          fileUrl: file.blob_url,
        });
        break;
      default:
        filesModified.push({
          fileName: "ERR",
          fileUrl: "ERR",
        });
    }
  });
  return {
    filesAdded: filesAdded,
    filesModified: filesModified,
    filesRemoved: filesRemoved,
  };
};

module.exports = {sortedFiles};
