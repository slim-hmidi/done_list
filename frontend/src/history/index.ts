import { createBrowserHistory } from "history";

const history = createBrowserHistory();
history.listen((listener) => {
  console.log(`new location via ${JSON.stringify(listener)}`);
});

export default history;
