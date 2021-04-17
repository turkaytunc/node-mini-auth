import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const { PORT = 4000 } = process.env;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
