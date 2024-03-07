import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from 'src/guards/auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalStrategy } from './strategies/locale.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthenticatedGuard } from 'src/guards/authenticate.guard';
import { SessionSerializer } from './strategies/session.serializer';



@Module({
    imports : [
        UsersModule , PassportModule.register({session: true}),
    ],
    controllers : [AuthController],
    providers : [AuthService ,  LocalStrategy , LocalAuthGuard , AuthenticatedGuard  , SessionSerializer ]
})
export class AuthModule{}