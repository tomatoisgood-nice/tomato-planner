const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

exports.handler = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const tasks = response.results.map((page) => ({
      id: page.id,
      task:
        page.properties.Task?.title?.[0]?.plain_text ||
        "Untitled",
      done:
        page.properties.Done?.checkbox || false,
      date:
        page.properties.Date?.date?.start || null,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(tasks),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
