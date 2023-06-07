"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserQuery = void 0;
var _graphqlTag = _interopRequireDefault(require("graphql-tag"));
var _client = require("../client");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const UserQuery = {
    async currentUserAsync () {
        const data = await (0, _client).withErrorHandlingAsync(_client.graphqlClient.query(_graphqlTag.default`
            query CurrentUser {
              meActor {
                __typename
                id
                ... on User {
                  username
                }
                ... on Robot {
                  firstName
                }
                accounts {
                  id
                  name
                }
                isExpoAdmin
              }
            }
          `, /* variables */ undefined, {
            additionalTypenames: [
                "User"
            ]
        }).toPromise());
        return data.meActor;
    }
};
exports.UserQuery = UserQuery;

//# sourceMappingURL=UserQuery.js.map