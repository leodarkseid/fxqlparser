import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Validator constraint for validating FXQL data format.
 * 
 * This class is used to validate that the FXQL data follows the correct format, including:
 * - A valid currency pair (e.g., "USD-EUR")
 * - Valid numerical values for BUY, SELL, and CAP.
 * 
 * It checks the format and value constraints for each part of the FXQL data and throws a BadRequestException if there are any issues.
 */
@ValidatorConstraint({ async: false })
export class RegexDataValidator implements ValidatorConstraintInterface {
  /**
   * Regular expression to match FXQL data format.
   *
   * Example: "USD-EUR { BUY 100 SELL 90 CAP 5000 }"
   */
  private regexData =
    /([A-Z0-9]{0,}-[A-Z0-9]{0,})\s*{\s*BUY\s+([^\s]+)\s*SELL\s+([^\s]+)\s*CAP\s+([^\s]+)\s*}/gim;

  /**
   * Validates if a given currency pair is in the correct format (e.g., "USD-EUR").
   *
   * @param {string} data - The currency pair to validate.
   * @returns {boolean} - Returns `true` if the currency pair matches the valid format, otherwise `false`.
   */
  validCurrencyPair(data: string): boolean {
    const currencyPairRegex = /^[A-Z]{3}-[A-Z]{3}$/;
    const validity = currencyPairRegex.test(data);
    return validity;
  }

  /**
   * Validates a string against a specific regex pattern, extracting and verifying the structure and values
   * of the currency pair, buy, sell, and cap data. The function checks if the values conform to the expected
   * format and numerical requirements. It also identifies errors in the input and provides detailed feedback
   * with line and character positions for each invalid part.
   *
   * The input string is expected to match the pattern:
   * `[CURRENCY-CURRENCY] { BUY X SELL Y CAP Z }`, where:
   * - `CURRENCY-CURRENCY` represents a valid currency pair (e.g., USD-EUR).
   * - `BUY X` is a numerical value for the buy price (should be a positive number).
   * - `SELL Y` is a numerical value for the sell price (should be a positive number).
   * - `CAP Z` is an integer representing the cap amount (should be a positive integer).
   *
   * @param {string} value - The string containing the FXQL data to validate.
   * @returns {boolean} - Returns `true` if the input string is valid, throws an error if invalid.
   * @throws {BadRequestException} - Throws a `BadRequestException` if any validation errors are found.
   *
   * The validation process performs the following:
   * 1. Replaces escaped newlines (`\n`) with actual newlines to ensure correct parsing.
   * 2. Splits the input into lines and checks each line against a regex pattern.
   * 3. Extracts the currency pair (`CP`), buy value (`BUY`), sell value (`SELL`), and cap value (`CAP`) from the matched string.
   * 4. Validates each component:
   *    - Checks if the `CP` matches the valid currency pair format (e.g., USD-EUR).
   *    - Verifies that the `BUY` and `SELL` values are positive numbers.
   *    - Ensures the `CAP` value is a positive integer.
   * 5. For each error, records the position of the invalid component in the input (line and character positions).
   * 6. If any errors are detected, throws a `BadRequestException` with a list of detailed error messages.
   */
  validate(value: string): boolean {
    // Replace escaped newlines for proper parsing
    value = value.replace(/\\n/g, '\n');
    const lines = value.split('\n');
    let match: RegExpExecArray | null;
    const errors = new Set();

    // this runs a loop on the Regex extracted data
    while ((match = this.regexData.exec(value)) !== null) {
      // Extract currency pair and values
      const CP = match[1];
      const BUY = match[2];
      const SELL = match[3];
      const CAP = match[4];
      const matchStartPos = match.index;
      const lineNumber = value.substring(0, matchStartPos).split('\n').length;
      const charPositionInLine =
        matchStartPos - value.lastIndexOf('\n', matchStartPos) - 1;
      const cpStartPos = match.index;
      const cpEndPos = cpStartPos + CP.length;

      const buyStartPos =
        match.index + match[1].length + match[0].indexOf('BUY') + 3; // 3 for the length of "BUY"
      const buyEndPos = buyStartPos + BUY.length;

      const sellStartPos = buyEndPos + match[0].indexOf('SELL') + 4; // 4 for the length of "SELL"
      const sellEndPos = sellStartPos + SELL.length;

      const capStartPos = sellEndPos + match[0].indexOf('CAP') + 3; // 3 for the length of "CAP"
      const capEndPos = capStartPos + CAP.length;

      // Validate currency pair, buy, sell, and cap values
      if (!this.validCurrencyPair(CP)) {
        errors.add(
          `Currency Pair -${CP} is not Valid at Line ${lineNumber} Character Position - ${cpStartPos}-${cpEndPos}`,
        );
      }

      if (!this.isNumber(BUY)) {
        errors.add(
          `BUY Value- ${BUY} is not valid at Line: ${lineNumber} Character Position - ${buyStartPos}-${buyEndPos}`,
        );
      }
      if (!this.isNumber(SELL)) {
        errors.add(
          `SELL Value- ${SELL} is not valid at Line: ${lineNumber} Character Position - ${sellStartPos}-${sellEndPos}`,
        );
      }
      if (!this.isNumber(CAP) || Number(CAP) % 1 !== 0) {
        errors.add(
          `CAP Value- ${CAP} is not valid at Line: ${lineNumber} Character Position - ${capStartPos}-${capEndPos}`,
        );
      }
    }

    // Throw error if there are validation issues
    if (errors.size > 0) {
      throw new BadRequestException({message:Array.from(errors), code: "FXQL-400"});
    }
    return true;
  }

  private isNumber(value: string): boolean {
    const number = parseFloat(value);
    return !isNaN(number) && isFinite(number) && number > 0;
  }

  private isInteger(value: string): boolean {
    return Number.isInteger(Number(value));
  }

  defaultMessage(): string {
    return 'Data format is invalid. Ensure it matches the required pattern and numerical values are valid.';
  }
}

export function IsRegexData(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: RegexDataValidator,
    });
  };
}

export class FXQLDto {
  @ApiProperty({
    description:
      'The FXQL data string, which should match the pattern: [CURRENCY-CURRENCY] { BUY X SELL Y CAP Z }',
    type: String,
    example: 'USD-EUR { BUY 100 SELL 90 CAP 5000 }', // Example data for better clarity
  })
  @IsString()
  @IsRegexData({
    message:
      'Invalid data format or numerical values. Ensure it matches: [CURRENCY-CURRENCY] { BUY X SELL Y CAP Z }',
  })
  FXQL: string;
}


/**
 * DTO (Data Transfer Object) for FXQL response data.
 * 
 * This DTO is used to represent the response format after the FXQL data is processed and stored in the database.
 */
export class FXQLResponseData {
  @ApiProperty({
    description: 'The unique identifier for the FXQL record',
    type: String,
    example: 'FXQL-bsddskfjsdfjsdfjsdfe',
  })
  EntryId: string;

  @ApiProperty({
    description: 'The source currency (e.g., NGN)',
    type: String,
    example: 'NGN',
  })
  SourceCurrency: string;

  @ApiProperty({
    description: 'The destination currency (e.g., NGN)',
    type: String,
    example: 'NGN',
  })
  DestinationCurrency: string;

  @ApiProperty({
    description: 'The sell price of the currency pair',
    type: Number,
    example: 42,
  })
  SellPrice: number;

  @ApiProperty({
    description: 'The buy price of the currency pair',
    type: Number,
    example: 42.42,
  })
  BuyPrice: number;

  @ApiProperty({
    description: 'The cap amount for the transaction',
    type: Number,
    example: 42424242,
  })
  CapAmount: number;
}

export class FXQLResponseDto {
  @ApiProperty({
    description: 'message',
    example: 'FXQL Statement Parsed Successfully.',
  })
  message: string;
  @ApiProperty({
    description: 'code',
    example: 'FXQL-200',
  })
  code: string;
  @ApiProperty({ description: 'FXQLResponseData', type: [FXQLResponseData] })
  data: FXQLResponseData[];
}

