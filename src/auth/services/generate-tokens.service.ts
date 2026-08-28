import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IServerConfig } from '../../config/interfaces/server_config.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokensDto } from '../dtos/generate-tokens.dto';
import { IGenerateTokensResponse } from '../interfaces/generate-tokens-response.interface';

@Injectable()
export class GenerateTokensService {
  private readonly serverConfig: IServerConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    // extract the server config from the config service
    const serverConfig = this.configService.get<IServerConfig>('server');

    if (!serverConfig) {
      throw new InternalServerErrorException(
        'Server configuration must be setup',
      );
    }

    this.serverConfig = serverConfig;
  }

  async generateTokens(
    generateTokensDto: GenerateTokensDto,
  ): Promise<IGenerateTokensResponse> {
    // generate the tokens
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(generateTokensDto, {
        secret: this.serverConfig.jwtAccessSecretKey,
        expiresIn: `${this.serverConfig.jwtAccessExpires}s`,
      }),
      this.jwtService.signAsync(generateTokensDto, {
        secret: this.serverConfig.jwtRefreshSecretKey,
        expiresIn: `${this.serverConfig.jwtRefreshExpires}s`,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
