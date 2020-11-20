const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET;

function getUserId(context: any) {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);

    return userId;
  }

  throw new Error('Not authenticated');
}

function replaceRange(text: string, end: number, substitute: string): string {
  const count = text.length - end;

  return substitute.repeat(count) + text.substr(-end);
}


export { APP_SECRET, getUserId, replaceRange};
