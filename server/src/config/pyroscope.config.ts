import Pyroscope from "@pyroscope/nodejs";

const PYROSCOPE_SERVER =
  process.env.PYROSCOPE_SERVER || "http://pyroscope:4040";

const isPyroscopeEnabled = process.env.NODE_ENV == "production";

if (isPyroscopeEnabled) {
  Pyroscope.init({
    serverAddress: PYROSCOPE_SERVER,
    appName: "express-vue-app",
    tags: {
      environment: process.env.NODE_ENV || "development",
    },
    wall: {
      collectCpuTime: true,
    },
  });

  Pyroscope.start();
  console.log(`> Pyroscope profiling enabled → ${PYROSCOPE_SERVER}`);
}

export default Pyroscope;
