"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getActorDisplayName = getActorDisplayName;
exports.getUserAsync = getUserAsync;
exports.loginAsync = loginAsync;
exports.logoutAsync = logoutAsync;
exports.ANONYMOUS_USERNAME = void 0;
var _fs = require("fs");
var _graphqlTag = _interopRequireDefault(require("graphql-tag"));
var Log = _interopRequireWildcard(require("../../log"));
var Analytics = _interopRequireWildcard(require("../../utils/analytics/rudderstackClient"));
var _codesigning = require("../../utils/codesigning");
var _client = require("../graphql/client");
var _userQuery = require("../graphql/queries/UserQuery");
var _client1 = require("../rest/client");
var _settings = require("../settings");
var _userSettings = _interopRequireDefault(require("./UserSettings"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
let currentUser;
const ANONYMOUS_USERNAME = "anonymous";
exports.ANONYMOUS_USERNAME = ANONYMOUS_USERNAME;
function getActorDisplayName(user) {
    switch(user == null ? void 0 : user.__typename){
        case "User":
            return user.username;
        case "Robot":
            return user.firstName ? `${user.firstName} (robot)` : "robot";
        default:
            return ANONYMOUS_USERNAME;
    }
}
async function getUserAsync() {
    var ref;
    const hasCredentials = _userSettings.default.getAccessToken() || ((ref = _userSettings.default.getSession()) == null ? void 0 : ref.sessionSecret);
    if (!_settings.APISettings.isOffline && !currentUser && hasCredentials) {
        const user = await _userQuery.UserQuery.currentUserAsync();
        currentUser = user != null ? user : undefined;
        if (user) {
            await Analytics.setUserDataAsync(user.id, {
                username: getActorDisplayName(user),
                user_id: user.id,
                user_type: user.__typename
            });
        }
    }
    return currentUser;
}
async function loginAsync(json) {
    const res = await (0, _client1).fetchAsync("auth/loginAsync", {
        method: "POST",
        body: JSON.stringify(json)
    });
    const { data: { sessionSecret  } ,  } = await res.json();
    const result = await _client.graphqlClient.query(_graphqlTag.default`
        query UserQuery {
          viewer {
            id
            username
          }
        }
      `, {}, {
        fetchOptions: {
            headers: {
                "expo-session": sessionSecret
            }
        },
        additionalTypenames: []
    }).toPromise();
    const { data: { viewer  } ,  } = result;
    await _userSettings.default.setSessionAsync({
        sessionSecret,
        userId: viewer.id,
        username: viewer.username,
        currentConnection: "Username-Password-Authentication"
    });
}
async function logoutAsync() {
    currentUser = undefined;
    await Promise.all([
        _fs.promises.rm((0, _codesigning).getDevelopmentCodeSigningDirectory(), {
            recursive: true,
            force: true
        }),
        _userSettings.default.setSessionAsync(undefined), 
    ]);
    Log.log("Logged out");
}

//# sourceMappingURL=user.js.map