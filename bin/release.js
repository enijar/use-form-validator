#!/usr/bin/env node
const path = require("path");
const { execSync } = require("child_process");
const { version } = require("../package");

const GIT_DIR_PATH = path.resolve(__dirname, "..", ".git");

// Commit package.json change
execSync(`git --git-dir ${GIT_DIR_PATH} add package.json`, {
  stdio: "inherit",
});
execSync(`git --git-dir ${GIT_DIR_PATH} commit -m "release: v${version}"`, {
  stdio: "inherit",
});

// Create release
execSync(`git --git-dir ${GIT_DIR_PATH} tag -a v${version} -m "${version}"`, {
  stdio: "inherit",
});
execSync(`git --git-dir ${GIT_DIR_PATH} push --tags`, { stdio: "inherit" });
