/* eslint-disable no-unused-vars */
import esbuild from "esbuild";
import process from "process";
import console from "node:console";
import { readFileSync } from "fs";

// eslint-disable-next-line no-undef
const { dependencies } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url)));

const production = (process.argv[2] === "--production");

const build = (name, config) => {
    return esbuild.build({
        bundle: true,
        external: Object.keys(dependencies),
        watch: production ? false : {
            onRebuild(error, result) {
                if (error) {
                    console.error(`[watch] building ${name} failed:`, error);
                } else {
                    const { stop, ...alerts } = result;
                    console.log(`[watch] built ${name}:`, alerts);
                }
            },
        },
        target: "es2020",
        ...config,
    }).then((result) => {
        const { stop, ...alerts } = result;
        console.log(`built ${name}:`, alerts);
    }).catch((error) => {
        console.error(`building ${name} failed:`, error);
        process.exit(1);
    });
};

const builds = [
    build("minified browser esm", {
        entryPoints: ["./src/index.browser.js"],
        minify: true,
        format: "esm",
        platform: "browser",
        outfile: "./dist/index.browser.min.js",
    }),
    build("node cjs", {
        entryPoints: ["./src/index.cjs.js"],
        format: "cjs",
        platform: "node",
        banner: {
            js: "/*\nThis is a bundled & transpiled file generated by esbuild\nIf you want to view the source, please visit the github repository\n*/",
        },
        outfile: "./dist/index.cjs",
    }),
];

if (!production) {
    Promise.all(builds).then(() => {
        console.log("watch mode enabled...");
    });
}
