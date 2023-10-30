module.exports.upload_attachment = (req, res) => {
  try {
    const filePath = `${req?.file?.destination}${req?.file?.filename}`;
    return res.status(201).json({ filePath });
  } catch (err) {
    return res.status(500).json({ message: "Request failed.", err });
  }
};
