const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const outputFilePathSchema = `SCHEMA__BACKUP__${new Date().toLocaleString()}`;
const outputFilePathData = `DATA__BACKUP__${new Date().toLocaleString()}`;

rl.question('Enter the PostgreSQL connection URI: ', (connectionUri) => {
  rl.close();

  const commandSchema = `pg_dump ${connectionUri} -s ${outputFilePathSchema}`;
  const commandData = `pg_dump ${connectionUri} -a ${outputFilePathData}`;

  exec(commandSchema, (error, stdout, stderr) => {
    if (error) {
      console.error('Error dumping Schema:', error);
    } else {
      console.log(`Database Schema dumped to ${outputFilePathSchema}`);
    }
  });

  exec(commandData, (error, stdout, stderr) => {
    if (error) {
      console.error('Error dumping daa:', error);
    } else {
      console.log(`Database data dumped to ${outputFilePathData}`);
    }
  });
});
