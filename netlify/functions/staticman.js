const { processEntry } = require("@staticman/netlify-functions");
const queryString = require("querystring");

exports.handler = (event, context, callback) => {
  const repo = process.env.REPO;
  const [username, repository] = repo.split("/");
  const bodyData = queryString.parse(event.body);

  event.queryStringParameters = {
    ...event.queryStringParameters,
    ...bodyData,
    username,
    repository,
  };

  const config = {
    origin: event.headers.origin,
    sites: {
      [repo]: {
        allowedFields: [
          "name",
          "email",
          "url",
          "comment",
          "rating",
          "reply_to",
        ],
        branch: "master",
        commitMessage: "Add comment to {options.slug}",
        filename: "comment-{@timestamp}",
        format: "yaml",
        generatedFields: {
          date: {
            type: "date",
          },
        },
        moderation: true,
        path: "data/comments/{options.slug}",
        requiredFields: ["name", "email", "comment"],
        transforms: {
          email: "md5",
        },
      },
    },
  };

  return processEntry(event, context, callback, config);
};
