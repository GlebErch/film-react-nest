import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('formatMessage returns tab-separated key-value fields ending with newline', () => {
    const result = logger.formatMessage('log', 'hello', 'ctx');

    expect(result).toBe('level=log\tmessage=hello\toptionalParams=["ctx"]\n');
  });

  it('formatMessage without optional params omits optionalParams field', () => {
    const result = logger.formatMessage('warn', 'only-message');

    expect(result).toBe('level=warn\tmessage=only-message\n');
  });

  it('log writes TSKV formatted message to console.log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    logger.log('order created');

    expect(spy).toHaveBeenCalledWith('level=log\tmessage=order created\n');

    spy.mockRestore();
  });

  it('error writes TSKV formatted message to console.error', () => {
    const spy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    logger.error('db down', 'OrderService');

    expect(spy).toHaveBeenCalledWith(
      'level=error\tmessage=db down\toptionalParams=["OrderService"]\n',
    );

    spy.mockRestore();
  });
});
