import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { parseFXQL, uuidToBase64 } from './tools';
import { FXQLResponseDto } from './dto';

/**
 * Service that processes FXQL data, transforms it, and stores it in a database.
 */
@Injectable()
export class FXQLService {
  /**
   * Creates an instance of the FXQLService.
   *
   * @param prisma - The PrismaService instance used to interact with the database.
   */
  constructor(private readonly prisma: PrismaService) {}
  /**
   * Processes FXQL data, parses it, transforms it, and stores it in the database.
   *
   * This method maps the parsed FXQL data to a list of objects containing FX transaction data,
   * generates a unique event ID for each transaction, and stores them in the transaction pool.
   * Finally, it returns a simplified list of entries if the database operation is successful.
   *
   * @param {string} data - The FXQL data string to be parsed and processed.
   * @returns {Promise<FXQLResponseDto> | HttpException}
   * A promise that resolves to an array of processed FX transaction data or throws an HttpException on error.
   *
   * @throws {HttpException} If an error occurs during processing, an HttpException with status code 418 (I'm a teapot) is thrown.
   */
  async processData(data: string): Promise<FXQLResponseDto> {
    try {
      // Parse the FXQL data
      const newDict = parseFXQL(data);
      // Transform the parsed data into a list of transactions
      const newList: Array<{
        id: string;
        sourceCurrency: string;
        destinationCurrency: string;
        sellPrice: number;
        buyPrice: number;
        capAmount: number;
      }> = newDict.map((obj) => {
        const id = crypto.randomUUID();
        const eventId = `FXQL-${uuidToBase64(id)}`;
        return {
          id: eventId,
          sourceCurrency: obj.currencyPair.slice(0, 3),
          destinationCurrency: obj.currencyPair.slice(-3),
          sellPrice: obj.SELL,
          buyPrice: obj.BUY,
          capAmount: obj.CAP,
        };
      });

      // Insert the new list into the database
      const dbOperation = await this.prisma.transactionPool.createMany({
        data: newList,
      });


      // If the insert was successful, return the formatted result
      if (newList.length == dbOperation.count) {

        return {
          message: "FXQL Statement Parsed Successfully.",
          code: "FXQL-200",
          data : newList.map((list) => {
          return {
            EntryId: list.id,
            SourceCurrency: list.sourceCurrency,
            DestinationCurrency: list.destinationCurrency,
            SellPrice: list.sellPrice,
            BuyPrice: list.buyPrice,
            CapAmount: list.capAmount,
          };
        })};
      }
    } catch (error) {
      throw new HttpException({
      message: `Edge case error: ${error.message || error.toString()}`,
      code: 'FXQL-418',
    }, HttpStatus.I_AM_A_TEAPOT, {
        cause: new Error(`The cause of this is unknown`),
      });
    }
  }
}
