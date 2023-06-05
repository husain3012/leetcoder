const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const outputFilePath = `DB__BACKUP__${new Date().toLocaleString()}`;

rl.question('Enter the PostgreSQL connection URI: ', (connectionUri) => {
  rl.close();

  const command = `pg_dump ${connectionUri} -F p -f ${outputFilePath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error dumping database:', error);
    } else {
      console.log(`Database dumped to ${outputFilePath}`);
    }
  });
});
