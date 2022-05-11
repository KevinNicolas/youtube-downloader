import express from "express";

export const initExpress = () => {
  const app = express();
  app.set("port", process.env.PORT || 3030);

  app.listen(app.get("port"), () =>
    console.info(`Server listen on port ${app.get("port")}`)
  );
};
