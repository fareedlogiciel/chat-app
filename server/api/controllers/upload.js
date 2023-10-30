module.exports.upload_attachment = (req, res) => {
  try {
    const path = `${req?.file?.destination}${req?.file?.filename}`;
    return res.status(201).json({ message: "success", imageUrl: path });
  } catch (err) {
    return res.status(500).json({ message: "Request failed.", err });
  }
};
