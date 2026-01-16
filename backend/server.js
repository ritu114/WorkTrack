import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req: any, res: { send: (arg0: string) => void; }) => {
  res.send("Backend server is running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
