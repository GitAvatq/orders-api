import buildServer from "./app";

const server = buildServer();

const startServer = () => {
  try {
    const PORT = process.env.PORT || 4200;
    server.listen(
      {
        port: PORT,
        host: "0.0.0.0",
      },
      () => {
        console.log(`Server is running now on port: http://localhost:${PORT}`);
      }
    );
  } catch (error) {
    console.log(`Server crushed, the crush : ${error}`);
  }
};

startServer();
