exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "Tomato Planner API 연결 성공 🍅"
    })
  };
};
