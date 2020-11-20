import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const APP_SECRET = process.env.APP_SECRET;

function getUserId(context: any) {
  const Authorization = context.request.get('Authorization');

  if(!APP_SECRET) {
    throw new Error('Misconfiguration');
  }

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    // @ts-ignore
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
