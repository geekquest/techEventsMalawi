const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

module.exports = withNativeWind(
  {
    ...config,
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
      ...config.transformer,
    },
    resolver: {
      assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...config.resolver.sourceExts, "svg"],
      ...config.resolver,
    },
  },
  { input: "./global.css" }
);
