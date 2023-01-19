import type { ConfigPlugin } from "@expo/config-plugins";
import {
  withProjectBuildGradle,
  withAndroidManifest,
  AndroidConfig,
  withInfoPlist,
} from "@expo/config-plugins";
import { writeFile, mkdir, existsSync } from "fs";
import { join } from "path";

type Config = {
  // IOS AND ANDROID
  OAuth2ClientID: string;
  //ONLY IOS
  Scheme: string;
  SCSDKRedirectUrl: string;
  NSCameraUsageDescription: string;
  NSMicrophoneUsageDescription: string;
};

const SnapchatConfigPlugin: ConfigPlugin<Config> = (expoConfig) => {
  if (!expoConfig?.extra?.SnapKit?.OAuth2ClientID) return expoConfig;
  const props = {
    OAuth2ClientID: expoConfig?.extra?.SnapKit?.OAuth2ClientID,
    Scheme: expoConfig?.extra?.SnapKit?.Scheme || "AppSchemeEXample",
    SCSDKRedirectUrl:
      expoConfig?.extra?.SnapKit?.SCSDKRedirectUrl ||
      "snapkitexample://main/auth",
    NSCameraUsageDescription:
      expoConfig?.extra?.SnapKit?.NSCameraUsageDescription ||
      "Capture photos for SnapChat",
    NSMicrophoneUsageDescription:
      expoConfig?.extra?.SnapKit?.NSMicrophoneUsageDescription ||
      "Capture videos for SnapChat",
  };
  let targetSdkVersion: number;
  let config = withInfoPlist(expoConfig, (modConfig) => {
    //@ts-ignore
    modConfig.modResults = {
      ...modConfig.modResults,
      ...buildInfoPlist(props.OAuth2ClientID, props),
      CFBundleURLTypes: [
        {
          ...modConfig.modResults.CFBundleURLTypes?.[0],
          CFBundleURLSchemes: [
            //@ts-ignore
            ...modConfig.modResults.CFBundleURLTypes?.[0]?.CFBundleURLSchemes,
            props.Scheme,
          ],
          CFBundleURLName: "$(PRODUCT_BUNDLE_IDENTIFIER)",
          //@ts-ignore
          CFBundleTypeRole: "Editor",
        },
      ],
    };
    return modConfig;
  });

  config = withProjectBuildGradle(expoConfig, (modConfig) => {
    targetSdkVersion = extractTargetSdkVersion(modConfig.modResults.contents);
    modConfig.modResults.contents = updateGradleBuild(
      modConfig.modResults.contents
    );
    return modConfig;
  });
  config = withAndroidManifest(config, async (modConfig) => {
    if (targetSdkVersion >= 30) {
      //@ts-ignore
      if (modConfig.modResults.manifest?.queries) {
        //@ts-ignore
        modConfig.modResults.manifest.queries[0] = {
          //@ts-ignore
          ...modConfig.modResults.manifest.queries[0],
          package: [
            {
              $: { "android:name": "com.snapchat.android" },
            },
          ],
        };
      } else {
        modConfig.modResults.manifest = {
          ...modConfig.modResults.manifest,
          //@ts-ignore
          queries: [
            {
              $: {},
              package: [
                {
                  $: { "android:name": "com.snapchat.android" },
                },
              ],
            },
          ],
        };
      }
    }
    //@ts-ignore
    modConfig.modResults.manifest.application?.[0] =
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        //@ts-ignore
        modConfig.modResults.manifest.application[0],
        "com.snapchat.kit.sdk.clientId",
        props.OAuth2ClientID,
        "value"
      );
    //@ts-ignore
    const provider = modConfig.modResults.manifest.application[0]?.provider;
    if (
      !provider ||
      (provider &&
        !provider.some(
          (prov: any) =>
            prov.$["android:name"] === "androidx.core.content.FileProvider"
        ))
    ) {
      //@ts-ignore
      modConfig.modResults.manifest.application?.[0] = {
        //@ts-ignore
        ...modConfig.modResults.manifest.application[0],
        ...buildFileProvider(expoConfig.android?.package || ""),
      };
    } else {
      // check if meta data are defined
      //<meta-data android:name="android.support.FILE_PROVIDER_PATHS" android:resource="@xml/file_paths"/>
      if (!provider[0]?.["meta-data"]) {
        //@ts-ignore
        modConfig.modResults.manifest.application[0].provider[0]["meta-data"] =
          [
            {
              $: {
                "android:name": "android.support.FILE_PROVIDER_PATHS",
                "android:resource": "@xml/file_paths",
              },
            },
          ];
      } else if (
        !provider[0]?.["meta-data"].some(
          (meta: any) =>
            meta.$["android:name"] === "android.support.FILE_PROVIDER_PATHS" &&
            meta.$["android:resource"] === "@xml/file_paths"
        )
      ) {
        //@ts-ignore
        modConfig.modResults.manifest.application[0].provider[0][
          "meta-data"
        ].push({
          $: {
            "android:name": "android.support.FILE_PROVIDER_PATHS",
            "android:resource": "@xml/file_paths",
          },
        });
      }
    }
    const dirPath = await AndroidConfig.Paths.getResourceFolderAsync(
      modConfig.modRequest.projectRoot
    );
    const filePath = await AndroidConfig.Paths.getResourceXMLPathAsync(
      modConfig.modRequest.projectRoot,
      //@ts-ignore
      { kind: "xml", name: "file_paths" }
    );
    const dirExist = await existsSync(join(dirPath, "xml"));
    if (!dirExist) {
      await mkdir(join(dirPath, "xml"), (err) => console.error(err));
    }
    await writeFile(filePath, file_pathsContent, { encoding: "utf-8" }, (err) =>
      console.error("write file error ::", err)
    );
    return modConfig;
  });
  return config;
};

const file_pathsContent =
  '<?xml version="1.0" encoding="utf-8"?>\n' +
  '<paths xmlns:android="http://schemas.android.com/apk/res/android">\n' +
  '  <files-path name="files" path="." />\n' +
  '  <external-files-path name="external_files" path="." />\n' +
  '  <external-path name="external_files" path="." />\n' +
  '  <cache-path name="cached_files" path="." />\n' +
  '  <external-cache-path name="cached_files" path="." />\n' +
  '  <root-path name="root" path="." />\n' +
  "</paths>";

export default SnapchatConfigPlugin;
const updateGradleBuild = (contents: string) => {
  const stringToAdd =
    "\n" +
    "        maven {\n" +
    '            url "https://storage.googleapis.com/snap-kit-build/maven"\n' +
    "        }";

  if (contents.includes(stringToAdd)) {
    return contents;
  }
  const content = contents.split("allprojects");
  const repos = content?.[1]?.split("repositories");
  const indexToAdd = repos[1].indexOf("{");
  const updated =
    content[0] +
    "allprojects" +
    repos[0] +
    "repositories" +
    repos[1].substring(0, indexToAdd + 1) +
    stringToAdd +
    repos[1].substring(indexToAdd + 1, repos[1].length);
  return updated;
};

const buildFileProvider = (applicationId: string) => {
  return {
    provider: [
      {
        $: {
          "android:name": "androidx.core.content.FileProvider",
          "android:authorities": `${applicationId}.fileprovider`,
          "android:exported": "false",
          "android:grantUriPermissions": "true",
        },
        "meta-data": [
          {
            $: {
              "android:name": "android.support.FILE_PROVIDER_PATHS",
              "android:resource": "@xml/file_paths",
            },
          },
        ],
      },
    ],
  };
};

const extractTargetSdkVersion = (content: string) => {
  let targetSdkVersion = "";
  for (
    let i = content.indexOf("targetSdkVersion") + 16;
    i < content.length;
    i++
  ) {
    if (/^\d$/.test(content[i])) {
      for (; /^\d$/.test(content[i]); ) {
        targetSdkVersion = targetSdkVersion + content[i];
        i++;
      }
      break;
    }
  }
  return Number(targetSdkVersion);
};

const buildInfoPlist = (applicationId: string, props: Config) => {
  return {
    LSApplicationQueriesSchemes: ["snapchat", "bitmoji-sdk", "itms-apps"],
    SCSDKClientId: applicationId,
    SCSDKRedirectUrl: props.SCSDKRedirectUrl,
    NSCameraUsageDescription: props.NSCameraUsageDescription,
    NSMicrophoneUsageDescription: props.NSMicrophoneUsageDescription,
  };
};
