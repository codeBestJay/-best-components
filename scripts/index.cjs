#!/usr/bin/env node
const { exec } = require("child_process");

const scripts = [
  "npm install",
  "standard-version",
  "npm run build",
  "git push --follow-tags origin main",
  "cd build",
  "npm publish",
];

const main = (i) => {
  if (scripts.length > i) {
    const command = scripts[i];
    const commandPartitions = command.split(" ");
    if (commandPartitions[0] === "cd") {
      process.chdir(commandPartitions[1]);
      main(i + 1);
    } else {
      exec(command, (e, stdout, stderr) => {
        if (e) {
          console.error("error", e);
        } else {
          console.log(stdout);
          console.log(stderr);
          main(i + 1);
        }
      });
    }
  } else {
    console.log("所有脚本执行完成");
  }
};

main(0);
