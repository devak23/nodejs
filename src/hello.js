
var chalk = require('chalk')

for (i = 0; i < 7; i++) {
  console.log('Hello World' + i)
  console.log(chalk.blue('Hello World' + i));
  console.log(chalk.red('Hello World' + i));
  console.log(chalk.yellow('Hello World' + i));
  console.log(chalk.green('Hello World' + i));
  console.log(chalk.cyan('Hello World' + i));
}
