import { Body, Controller, Get, Post, Redirect } from '@nestjs/common';
import { FXQLService } from './FXQL.service';
import { FXQLDto, FXQLResponseDto } from './dto';
import { Throttle } from '@nestjs/throttler';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
//import { FXQLResponseDto } from './dto/index';

@Controller()
@Throttle({ default: { limit: 100, ttl: 60000 } })
/**
 * Controller that handles FXQL data and manages requests to the API.
 */
export class AppController {
  /**
   * Creates an instance of the AppController.
   * @param app - The FXQLService instance that handles the business logic.
   */
  constructor(private readonly app: FXQLService) {}

  /**
   * Redirects the user to the /api endpoint with throttling.
   *
   * @returns {string} - A redirect response to '/api'.
   *
   * @throttle { limit: 1, ttl: 6000000 } - Limits the requests to 1 per 6000000 ms.
   * @redirect {to: '/api', status: 302} - Performs a 302 redirect to /api.
   *
   * @ApiOperation({
   *   summary: 'Redirect to API endpoint',
   *   description: 'This endpoint throttles requests and redirects to /api.',
   * })
   * @ApiResponse({
   *   status: 302,
   *   description: 'Redirects to /api endpoint',
   *   schema: {
   *     type: 'string',
   *     example: '/api',
   *   },
   * })
   * @ApiResponse({
   *   status: 429,
   *   description: 'Too many requests, rate limit exceeded',
   * })
   */
  @Throttle({ default: { limit: 1, ttl: 6000000 } })
  @Get('/')
  @Redirect('/api', 302)
  @ApiOperation({
    summary: 'Redirect to API endpoint',
    description: 'This endpoint throttles requests and redirects to /api.',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirects to /api endpoint', // Description for successful redirection
    schema: {
      type: 'string', // Response is a string (URL for redirection)
      example: '/api', // Example redirection URL
    },
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests, rate limit exceeded', // Response for rate-limiting
  })
  getHome(): string {
    return 'Home';
  }

  /**
   * Parses FXQL data and processes it.
   *
   * @param data - The FXQL data to be parsed.
   * @returns {Promise<FXQLResponseDto>} - The processed FXQL data.
   *
   * @@ApiOperation({
   *   summary: 'Parse FXQL data',
   *   description: 'Parses FXQL data sent in the request body and processes it.',
   * })
   * @ApiBody({
   *   description: 'The FXQL data to be parsed',
   *   type: FXQLDto,
   * })
   * @ApiResponse({
   *   status: 200,
   *   description: 'Successfully processed FXQL data',
   *   type: FXQLResponseDto,
   * })
   * @ApiResponse({
   *   status: 400,
   *   description: 'Invalid FXQL data provided',
   * })
   * @ApiResponse({
   *   status: 500,
   *   description: 'Internal server error',
   * })
   * @ApiResponse({
   *   status: 429,
   *   description: 'Too many requests, rate limit exceeded',
   * })
   */

  @ApiOperation({
    summary: 'Parse FXQL data', // Brief description of what the endpoint does
    description: 'Parses FXQL data sent in the request body and processes it.', // Detailed description
  })
  @ApiBody({
    description: 'The FXQL data to be parsed',
    type: FXQLDto, // The DTO used to describe the body of the request
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully processed FXQL data', // Success response description
    type: FXQLResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid FXQL data provided', // Response for invalid input
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error', // Response for server errors
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests, rate limit exceeded', // Response for rate-limiting
  })
  @Post('parse')
  async parseData(@Body() data: FXQLDto) {
    return this.app.processData(data.FXQL);
  }
}
