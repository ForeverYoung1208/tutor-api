import {
  Controller,
  Get,
  Post,
  Param,
  Logger,
  UseGuards,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingResponse } from './responses/meeting.response';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UseResponse } from '../../decorators/use-response.decorator';
import { Meeting } from '../../entities/meeting.entity';
import { WithAuth } from '../../decorators/with-auth.decorator';
import { Roles } from '../../constants/system';
import { JwtUserPayloadDto } from '../auth/dto/jwt-user-payload.dto';

@ApiTags('Meetings')
@Controller('meetings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MeetingsController {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(private readonly meetingsService: MeetingsService) {}

  @ApiOperation({ summary: 'Create a new meeting (Admin only)' })
  @ApiBody({ type: CreateMeetingDto })
  @ApiCreatedResponse({ type: MeetingResponse })
  @ApiForbiddenResponse({ description: 'Admin access required' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @WithAuth([Roles.ADMIN])
  @UseResponse(MeetingResponse)
  @Post()
  async create(
    @Body() createMeetingDto: CreateMeetingDto,
    @AuthUser() user: JwtUserPayloadDto,
  ): Promise<Meeting> {
    return this.meetingsService.create(createMeetingDto, user);
  }

  @ApiOperation({ summary: 'Get all meetings' })
  @ApiOkResponse({ type: [MeetingResponse] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseResponse(MeetingResponse)
  @Get()
  async findAll(): Promise<Meeting[]> {
    return this.meetingsService.findAll();
  }

  @ApiOperation({ summary: 'Get meeting by ID' })
  @ApiOkResponse({ type: MeetingResponse })
  @ApiNotFoundResponse({ description: 'Meeting not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseResponse(MeetingResponse)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Meeting> {
    return this.meetingsService.findOne(id);
  }

  @ApiOperation({ summary: 'Join a meeting and get access token' })
  @ApiOkResponse({ description: 'Access token for meeting' })
  @ApiNotFoundResponse({ description: 'Meeting not found' })
  @ApiForbiddenResponse({ description: 'Cannot join this meeting' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post(':id/join')
  async joinMeeting(
    @Param('id') id: string,
    @AuthUser() user: JwtUserPayloadDto,
  ): Promise<{ token: string }> {
    const token = await this.meetingsService.generateToken(id, user);
    return { token };
  }

  @ApiOperation({ summary: 'End a meeting (Admin or creator only)' })
  @ApiOkResponse({ type: MeetingResponse })
  @ApiNotFoundResponse({ description: 'Meeting not found' })
  @ApiForbiddenResponse({ description: 'Admin or creator access required' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseResponse(MeetingResponse)
  @Post(':id/end')
  async endMeeting(
    @Param('id') id: string,
    @AuthUser() user: JwtUserPayloadDto,
  ): Promise<Meeting> {
    return this.meetingsService.endMeeting(id, user);
  }
}
