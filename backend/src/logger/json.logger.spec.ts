import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('formatMessage returns valid JSON with level, message and optionalParams', () => {
    const result = logger.formatMessage('log', 'hello', 'ctx');
    const parsed = JSON.parse(result);

    expect(parsed).toEqual({
      level: 'log',
      message: 'hello',
      optionalParams: ['ctx'],
    });
  });

  it('log writes formatted JSON to console.log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    logger.log('film fetched', 'FilmsController');

    expect(spy).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(spy.mock.calls[0][0] as string);
    expect(payload.level).toBe('log');
    expect(payload.message).toBe('film fetched');
    expect(payload.optionalParams).toEqual(['FilmsController']);

    spy.mockRestore();
  });

  it('error writes formatted JSON to console.error', () => {
    const spy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    logger.error('failed', 'stack');

    expect(spy).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(spy.mock.calls[0][0] as string);
    expect(payload.level).toBe('error');
    expect(payload.message).toBe('failed');

    spy.mockRestore();
  });

  it('warn writes formatted JSON to console.warn', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    logger.warn('slow query');

    expect(spy).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(spy.mock.calls[0][0] as string);
    expect(payload.level).toBe('warn');
    expect(payload.message).toBe('slow query');

    spy.mockRestore();
  });
});
