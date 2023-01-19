import type { ConfigPlugin } from "@expo/config-plugins";
type Config = {
    OAuth2ClientID: string;
    Scheme: string;
    SCSDKRedirectUrl: string;
    NSCameraUsageDescription: string;
    NSMicrophoneUsageDescription: string;
};
declare const SnapchatConfigPlugin: ConfigPlugin<Config>;
export default SnapchatConfigPlugin;
