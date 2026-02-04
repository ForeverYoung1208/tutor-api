import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { JwtUserPayloadDto } from '../dto/jwt-user-payload.dto';
import { User } from '../../../entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<JwtUserPayloadDto> {
    let user: User;
    try {
      user = await this.authService.validateUser(email, password);
    } catch (e) {
      throw new Error((e as Error)?.message);
    }

    if (!user) {
      throw new Error();
    }

    return { id: user.id };
  }
}
