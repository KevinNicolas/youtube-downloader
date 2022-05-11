export class Console {
  static devError(message: string) {
    if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'development') console.error(message);
  }
  static devInfo(message: string) {
    if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'development') console.info(message);
  }
  static devLog(message: string) {
    if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'development') console.log(message);
  }
  static error(message: string) {
    console.error(message);
  }
  static info(message: string) {
    console.info(message);
  }
  static log(message: string) {
    console.log(message);
  }
}
