import { registerAs } from '@nestjs/config';

export type TOpenviduConfig = {
  url: string;
  secret: string;
  apiKey: string;
  timeout: number;
};

export const openviduConfig = registerAs(
  'openvidu',
  () =>
    ({
      url: process.env.LIVEKIT_URL || 'https://for-test.click',
      secret: process.env.LIVEKIT_SECRET,
      apiKey: process.env.LIVEKIT_API_KEY,
      timeout: parseInt(process.env.LIVEKIT_TIMEOUT || '30000', 10),
    }) as TOpenviduConfig,
);
