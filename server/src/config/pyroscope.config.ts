const PYROSCOPE_SERVER =
  process.env.PYROSCOPE_SERVER || "http://pyroscope:4040";

const isPyroscopeEnabled = process.env.NODE_ENV === "production";

if (isPyroscopeEnabled) {
  import("@pyroscope/nodejs")
    .then((PyroscopeModule) => {
      const Pyroscope = PyroscopeModule.default;
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
    })
    .catch((err) => {
      console.warn("> Pyroscope failed to load:", err.message);
    });
}
