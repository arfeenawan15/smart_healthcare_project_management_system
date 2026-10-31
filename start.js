// start.js - Unified launcher for Smart Healthcare SPM System
const { spawn } = require('child_process');

console.log("==================================================================");
console.log("Starting Smart Healthcare Project Management System...");
console.log("5 Hospitals Network SPM System (MERN Stack)");
console.log("==================================================================");

// Start backend server
const serverProcess = spawn('node server/server.js', {
  shell: true,
  stdio: 'inherit'
});

// Start client dev server
const clientProcess = spawn('npm --prefix client run dev', {
  shell: true,
  stdio: 'inherit'
});

const cleanup = () => {
  console.log("\nShutting down servers...");
  try { serverProcess.kill(); } catch (e) {}
  try { clientProcess.kill(); } catch (e) {}
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
