/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

const nextConfig = {
//   lessLoaderOptions: {
//     lessOptions: {
//       modifyVars: {
//         // Add variables here
//         "font-family": "Quicksand, sans-serif",
//         "border-radius-base": "50px",
//       },
//     },
//   },
//   compiler: {
//     styledComponents: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.less$/i,
//         use: [{ loader: "less-loader" }],
//       },
//     ],
//   },
};

module.exports = nextConfig;
// module.exports = withLess(nextConfig);
