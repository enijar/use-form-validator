#!/usr/bin/env node
const { execSync } = require("child_process");
const { version } = require("../package");

// Create release
execSync(`git tag -a v${version} "${version}"`, { stdio: "inherit" });
execSync(`git push --tags`, { stdio: "inherit" });
