import app from './loaders/index';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listens on ${port}`);
});
