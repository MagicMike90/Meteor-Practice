class DebugLog {
  constructor() {
    this.info = chalk.bold.blue;
    this.debug = chalk.bold.yellow;
    this.error = chalk.bold.red;
  }
  static i(text) {
    console.log(this.info(text));
  }
  static d(text) {
    console.log(this.debug(text));
  }
  static e(text) {
    console.log(this.error(text));
  }
}
