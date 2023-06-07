"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var OfferType;
(function(OfferType) {
    OfferType[/** Term subscription */ "Subscription"] = "SUBSCRIPTION";
    OfferType[/** Advanced Purchase of Paid Resource */ "Prepaid"] = "PREPAID";
    OfferType[/** Addon, or supplementary subscription */ "Addon"] = "ADDON";
})(OfferType || (OfferType = {}));
var Feature;
(function(Feature) {
    Feature[/** Top Tier Support */ "Support"] = "SUPPORT";
    Feature[/** Share access to projects */ "Teams"] = "TEAMS";
    Feature[/** Priority Builds */ "Builds"] = "BUILDS";
    Feature[/** Funds support for open source development */ "OpenSource"] = "OPEN_SOURCE";
})(Feature || (Feature = {}));
var AppPrivacy;
(function(AppPrivacy) {
    AppPrivacy["Public"] = "PUBLIC";
    AppPrivacy["Unlisted"] = "UNLISTED";
    AppPrivacy["Hidden"] = "HIDDEN";
})(AppPrivacy || (AppPrivacy = {}));
var AppPlatform;
(function(AppPlatform) {
    AppPlatform["Ios"] = "IOS";
    AppPlatform["Android"] = "ANDROID";
})(AppPlatform || (AppPlatform = {}));
var SecondFactorMethod;
(function(SecondFactorMethod) {
    SecondFactorMethod[/** Google Authenticator (TOTP) */ "Authenticator"] = "AUTHENTICATOR";
    SecondFactorMethod[/** SMS */ "Sms"] = "SMS";
})(SecondFactorMethod || (SecondFactorMethod = {}));
var Permission;
(function(Permission) {
    Permission["Own"] = "OWN";
    Permission["Admin"] = "ADMIN";
    Permission["Publish"] = "PUBLISH";
    Permission["View"] = "VIEW";
})(Permission || (Permission = {}));
var Role;
(function(Role) {
    Role["Owner"] = "OWNER";
    Role["Admin"] = "ADMIN";
    Role["Developer"] = "DEVELOPER";
    Role["ViewOnly"] = "VIEW_ONLY";
    Role["Custom"] = "CUSTOM";
    Role["HasAdmin"] = "HAS_ADMIN";
    Role["NotAdmin"] = "NOT_ADMIN";
})(Role || (Role = {}));
var BuildJobLogsFormat;
(function(BuildJobLogsFormat) {
    BuildJobLogsFormat["Raw"] = "RAW";
    BuildJobLogsFormat["Json"] = "JSON";
})(BuildJobLogsFormat || (BuildJobLogsFormat = {}));
var BuildJobStatus;
(function(BuildJobStatus) {
    BuildJobStatus["Pending"] = "PENDING";
    BuildJobStatus["Started"] = "STARTED";
    BuildJobStatus["InProgress"] = "IN_PROGRESS";
    BuildJobStatus["Errored"] = "ERRORED";
    BuildJobStatus["Finished"] = "FINISHED";
    BuildJobStatus["SentToQueue"] = "SENT_TO_QUEUE";
})(BuildJobStatus || (BuildJobStatus = {}));
var AppleDeviceClass;
(function(AppleDeviceClass) {
    AppleDeviceClass["Ipad"] = "IPAD";
    AppleDeviceClass["Iphone"] = "IPHONE";
})(AppleDeviceClass || (AppleDeviceClass = {}));
var IosDistributionType;
(function(IosDistributionType) {
    IosDistributionType["AppStore"] = "APP_STORE";
    IosDistributionType["Enterprise"] = "ENTERPRISE";
    IosDistributionType["AdHoc"] = "AD_HOC";
    IosDistributionType["Development"] = "DEVELOPMENT";
})(IosDistributionType || (IosDistributionType = {}));
var AppStoreConnectUserRole;
(function(AppStoreConnectUserRole) {
    AppStoreConnectUserRole["Admin"] = "ADMIN";
    AppStoreConnectUserRole["Finance"] = "FINANCE";
    AppStoreConnectUserRole["Technical"] = "TECHNICAL";
    AppStoreConnectUserRole["AccountHolder"] = "ACCOUNT_HOLDER";
    AppStoreConnectUserRole["ReadOnly"] = "READ_ONLY";
    AppStoreConnectUserRole["Sales"] = "SALES";
    AppStoreConnectUserRole["Marketing"] = "MARKETING";
    AppStoreConnectUserRole["AppManager"] = "APP_MANAGER";
    AppStoreConnectUserRole["Developer"] = "DEVELOPER";
    AppStoreConnectUserRole["AccessToReports"] = "ACCESS_TO_REPORTS";
    AppStoreConnectUserRole["CustomerSupport"] = "CUSTOMER_SUPPORT";
    AppStoreConnectUserRole["CreateApps"] = "CREATE_APPS";
    AppStoreConnectUserRole["CloudManagedDeveloperId"] = "CLOUD_MANAGED_DEVELOPER_ID";
    AppStoreConnectUserRole["CloudManagedAppDistribution"] = "CLOUD_MANAGED_APP_DISTRIBUTION";
    AppStoreConnectUserRole["ImageManager"] = "IMAGE_MANAGER";
    AppStoreConnectUserRole["Unknown"] = "UNKNOWN";
})(AppStoreConnectUserRole || (AppStoreConnectUserRole = {}));
var AndroidFcmVersion;
(function(AndroidFcmVersion) {
    AndroidFcmVersion["Legacy"] = "LEGACY";
    AndroidFcmVersion["V1"] = "V1";
})(AndroidFcmVersion || (AndroidFcmVersion = {}));
var AndroidKeystoreType;
(function(AndroidKeystoreType) {
    AndroidKeystoreType["Jks"] = "JKS";
    AndroidKeystoreType["Pkcs12"] = "PKCS12";
    AndroidKeystoreType["Unknown"] = "UNKNOWN";
})(AndroidKeystoreType || (AndroidKeystoreType = {}));
var WebhookType;
(function(WebhookType) {
    WebhookType["Build"] = "BUILD";
    WebhookType["Submit"] = "SUBMIT";
})(WebhookType || (WebhookType = {}));

//# sourceMappingURL=generated.js.map