import createHttpError from 'http-errors';
import { UserCollections } from '../db/models/userSchema.js';
import bcrypt from 'bcrypt';
import { sessionsCollections } from '../db/models/sessions.js';

export const registerUser = async (payload) => {
  const user = await UserCollections.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');
  const encrypterdPassword = await bcrypt.hash(payload.password, 10);

  return await UserCollections.create({
    ...payload,
    password: encrypterdPassword,
  });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_EXPIRY),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_EXPIRY),
  };
};
export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  console.log('Проверка сессии:', { sessionId, refreshToken });
  const session = await sessionsCollections.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }
  const newSession = createSession();
  await sessionsCollections.deleteOne({ _id: sessionId, refreshToken });
  return await sessionsCollections.create({
    userId: session.userId,
    ...newSession,
  });
};
