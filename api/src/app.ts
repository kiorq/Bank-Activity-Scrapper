import Server from "./server";

const PORT = parseInt(process.env.PORT);

new Server(PORT).start();
