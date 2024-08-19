const msg1 = 'Welcome to Holberton School, what is your name?\n';
process.stdout.write(msg1);

if (process.stdin.isTTY) {
  process.stdin.on('data', (data) => {
    process.stdout.write(`Your name is: ${data.toString()}`);
    process.exit();
  });
} else {
  process.stdin.on('data', (data) => {
    process.stdout.write(`Your name is: ${data.toString()}`);
    process.exit();
  });
  process.on('exit', () => {
    const msg2 = 'This important software is now closing\n';
    process.stdout.write(msg2);
  });
}
