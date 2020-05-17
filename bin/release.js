#!/usr/bin/env node
const path = require("path");
const { execSync } = require("child_process");
const { version } = require("../package");

const BASE_PATH = path.resolve(__dirname, "..");

// Commit package.json change
execSync(`git -c ${BASE_PATH} add package.json`, { stdio: "inherit" });

// Create release
execSync(`git -c ${BASE_PATH} tag -a v${version} "${version}"`, { stdio: "inherit" });
execSync(`git -c ${BASE_PATH} push --tags`, { stdio: "inherit" });
