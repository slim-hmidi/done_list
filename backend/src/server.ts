import { app } from "./app";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listens on 127.0.0.1:${port}`);
});
