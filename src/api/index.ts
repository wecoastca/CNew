// start the listening for servers
import app from './app';

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
