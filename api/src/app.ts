import Server from "./server";

const PORT = parseInt(process.env.PORT) || 8000;

new Server(PORT).start();
