import { exec } from "child_process";

const projects = [
  { command: "bun dev", cwd: "server" },
  { command: "bun dev", cwd: "frontend/web" },
];

projects.forEach(({ command, cwd }) => {
  const child = exec(command, { cwd });
  child.stdout.on("data", (data) => {
    console.log(`[${cwd}]: ${data}`);
  });
  child.stderr.on("data", (data) => {
    console.error(`[${cwd}]: ${data}`);
  });
});
