#!/usr/bin/env node

const program = require('commander');

const Analytics = require('.').default;
const pkg = require('./package');

const toObject = (str) => JSON.parse(str);

// node cli.js -w "write-key" -h "http://localhost" -t "identify" -u 'id
program
  .version(pkg.version)
  .option('-w, --writeKey <key>', 'the write key to use')
  .option('-h, --host <host>', 'the API hostname to use')
  .option('-t, --type <type>', 'the message type')

  .option('-u, --userId <id>', 'the user id to send the event as')
  .option('-a, --anonymousId <id>', 'the anonymous user id to send the event as')
  .option('-c, --context <context>', 'additional context for the event (JSON-encoded)', toObject)
  .option(
    '-i, --integrations <integrations>',
    'additional integrations for the event (JSON-encoded)',
    toObject
  )

  .option('-e, --event <event>', 'the event name to send with the event')
  .option('-p, --properties <properties>', 'the event properties to send (JSON-encoded)', toObject)

  .option('-n, --name <name>', 'name of the screen or page to send with the message')
  .option('-t, --traits <traits>', 'the identify/group traits to send (JSON-encoded)', toObject)
  .option('-g, --groupId <groupId>', 'the group id')
  .option('-pid, --previousId <previousId>', 'the previous id')

  .parse(process.argv);

if (program.args.length !== 0) {
  program.help();
}

const writeKey = program.writeKey;
const host = program.host;
const type = program.type;

const userId = program.userId;
const anonymousId = program.anonymousId;
const context = program.context;
const integrations = program.integrations;

const event = program.event;
const properties = program.properties;
const name = program.name;
const traits = program.traits;
const groupId = program.groupId;
const previousId = program.previousId;

const run = (method, args) => {
  const analytics = new Analytics(writeKey, host, { flushAt: 1 });
  analytics[method](args, (err) => {
    if (err) {
      console.error(err.stack);
      process.exit(1);
    }
  });
};

switch (type) {
  case 'track':
    run('track', {
      event,
      properties,
      userId,
      anonymousId,
      context,
      integrations,
    });
    break;
  case 'page':
    run('page', {
      name,
      properties,
      userId,
      anonymousId,
      context,
      integrations,
    });
    break;
  case 'screen':
    run('screen', {
      name,
      properties,
      userId,
      anonymousId,
      context,
      integrations,
    });
    break;
  case 'identify':
    run('identify', {
      traits,
      userId,
      anonymousId,
      context,
      integrations,
    });
    break;
  case 'group':
    run('group', {
      groupId,
      traits,
      userId,
      anonymousId,
      context,
      integrations,
    });
    break;
  case 'alias':
    run('alias', {
      previousId,
      userId,
      anonymousId,
      context,
      integrations,
    });
    break;
  default:
    console.error('invalid type:', type);
    process.exit(1);
}
