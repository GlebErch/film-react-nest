import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: jest.Mocked<
    Pick<FilmsService, 'getFilms' | 'getScheduleByFilmId'>
  >;

  beforeEach(async () => {
    filmsService = {
      getFilms: jest.fn(),
      getScheduleByFilmId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: filmsService,
        },
      ],
    }).compile();

    controller = module.get(FilmsController);
  });

  it('getFilms returns films list from service', async () => {
    const response = {
      total: 1,
      items: [
        {
          id: 'film-1',
          rating: 8,
          director: 'Director',
          tags: ['tag'],
          title: 'Title',
          about: 'About',
          description: 'Description',
          image: '/bg1s.jpg',
          cover: '/bg1c.jpg',
          schedule: [
            {
              id: 'session-1',
              daytime: '2024-06-28T10:00:53.000Z',
              hall: 0,
              rows: 5,
              seats: 10,
              price: 350,
              taken: [],
            },
          ],
        },
      ],
    };
    filmsService.getFilms.mockResolvedValue(response);

    await expect(controller.getFilms()).resolves.toEqual(response);
    expect(filmsService.getFilms).toHaveBeenCalledTimes(1);
  });

  it('getSchedule delegates film id to service', async () => {
    const response = {
      total: 1,
      items: [
        {
          id: 'session-1',
          daytime: '2024-06-28T10:00:53.000Z',
          hall: 0,
          rows: 5,
          seats: 10,
          price: 350,
          taken: [],
        },
      ],
    };
    filmsService.getScheduleByFilmId.mockResolvedValue(response);

    await expect(controller.getSchedule('film-1')).resolves.toEqual(response);
    expect(filmsService.getScheduleByFilmId).toHaveBeenCalledWith('film-1');
  });
});
