module.exports.upload_attachment = (req, res) => {
  try {
    return res.status(201).json({ message: "success", image: req?.file?.path });
  } catch (err) {
    return res.status(500).json({ message: "Request failed.", err });
  }
};
