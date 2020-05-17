#!/usr/bin/env node
const path = require("path");
const fs = require("fs");

// releaseType can be one of: "major", "minor", "patch"
const [node, file, release = "patch"] = process.argv;

const BASE_PATH = path.resolve(__dirname, "..");
const PACKAGE_PATH = path.join(BASE_PATH, "package.json");
const VERSION_PATTERN = /"version":\s?"(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)"/gm;

// Bump version number
const json = fs.readFileSync(PACKAGE_PATH, "utf8");
const { groups } = VERSION_PATTERN.exec(json);
const major = parseInt(groups.major) + (release === "major" ? 1 : 0);
const minor = parseInt(groups.minor) + (release === "minor" ? 1 : 0);
const patch = parseInt(groups.patch) + (release === "patch" ? 1 : 0);
const version = `"version": "${major}.${minor}.${patch}"`;

fs.writeFileSync(PACKAGE_PATH, json.replace(VERSION_PATTERN, version), "utf8");
