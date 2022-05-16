export class Console {
  static devError(message: unknown) {
    if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'development') console.error(message);
  }
  static devInfo(message: unknown) {
    if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'development') console.info(message);
  }
  static devLog(message: unknown) {
    if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'development') console.log(message);
  }
  static error(message: unknown) {
    console.error(message);
  }
  static info(message: unknown) {
    console.info(message);
  }
  static log(message: unknown) {
    console.log(message);
  }
}
