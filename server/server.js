// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const charterRoutes = require('./routes/charter');
const scopeRoutes = require('./routes/scope');
const scheduleRoutes = require('./routes/schedule');
const costRoutes = require('./routes/cost');
const qualityRoutes = require('./routes/quality');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/charter', charterRoutes);
app.use('/api/scope', scopeRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/cost', costRoutes);
app.use('/api/quality', qualityRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: "online", timestamp: new Date(), project: "Smart Healthcare SPM" });
});

// Serve frontend production build if present (enables single-port execution)
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`==================================================================`);
  console.log(`Smart Healthcare Project Management and Monitoring System (SPM)`);
  console.log(`Backend API running at : http://localhost:${PORT}/api/`);
  console.log(`Single-Port App UI at  : http://localhost:${PORT}/`);
  console.log(`==================================================================`);
});

module.exports = app;
