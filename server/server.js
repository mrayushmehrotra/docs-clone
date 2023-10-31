const mongoose = require("mongoose");
const Document = require("./documentSchema");
const env = require("dotenv").config();
mongoose.connect(process.env.DB_URI).then(console.log("connected to DB"));
const defaultValue = "";
const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDoc(documentId);

    socket.join(documentId);
    socket.emit("load-document", Document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
    socket.on("sav-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreateDoc(id) {
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await document.create({ _id: id, data: defaultValue });
}
