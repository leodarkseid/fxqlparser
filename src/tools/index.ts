type UUID = string;
type Base64UUID = string;

export function uuidToBase64(uuid: UUID): Base64UUID {
  return Buffer.from(uuid.replace(/-/g, ''), 'hex').toString('base64url');
}

export function base64toUUID(base64: Base64UUID): UUID {
  const hex = Buffer.from(base64, 'base64url').toString('hex');

  return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(
    12,
    16,
  )}-${hex.substring(16, 20)}-${hex.substring(20)}`;
}

export function parseFXQL(
  data: string,
): Array<{ currencyPair: string; BUY: number; SELL: number; CAP: number }> {
  data = data.replace(/\\n/g, '\n');
  //console.log('data', data);
  const regexData =
    /([A-Z]{3}-[A-Z]{3})\s*{\s*BUY\s+(\d+(\.\d+)?)\s*SELL\s+(\d+(\.\d+)?)\s*CAP\s+(\d+)\s*}/gim;
  const results: Array<{
    currencyPair: string;
    BUY: number;
    SELL: number;
    CAP: number;
  }> = [];

  let match: RegExpExecArray | null;
  while ((match = regexData.exec(data)) !== null) {
    // Extract currency pair and values

    const currencyPair = match[1];
    //console.log('m2', match[2]);
    const BUY = parseFloat(match[2]);
    const SELL = parseFloat(match[4]);
    const CAP = parseInt(match[6], 10);

    results.push({ currencyPair, BUY, SELL, CAP });
  }
  //console.log('Result', results);
  return results;
}

