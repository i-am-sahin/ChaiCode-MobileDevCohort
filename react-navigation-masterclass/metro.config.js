const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Bun (and some install flows) can leave behind transient `node_modules/.old-*` folders.
// If Metro ever scans those, it can bundle duplicate copies of native modules (e.g. react-native-screens),
// leading to: "Tried to register two views with the same name ...".
config.resolver.blockList = [/\/node_modules\/\.old-.*/];

module.exports = config;
