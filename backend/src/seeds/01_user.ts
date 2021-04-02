import {Knex} from 'knex';
import tableNames from '@constants/tableNames';

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableNames.user).del();

  // Inserts seed entries
  await knex(tableNames.user).insert([
    {
      id: 1,
      first_name: 'Wallie',
      last_name: 'Buie',
      username: 'wbuie0',
      email: 'wbuie0@newyorker.com',
      password: '$2b$10$VzTCHvTEIWYM42l/Us.02.4y5YH6bGBlQKFaf3nxw66pZANwSBsG6',
      birthday: '1990-07-05',
    },
    {
      id: 2,
      first_name: 'Toma',
      last_name: 'Tullis',
      username: 'ttullis1',
      email: 'ttullis1@about.com',
      password: '$2b$10$VzTCHvTEIWYM42l/Us.02.iNrYEOjpSVWw9qMighd2ZWwM4w/xg42',
      birthday: '1981-05-01',
    },
    {
      id: 3,
      first_name: 'Maxy',
      last_name: 'Folk',
      username: 'mfolk2',
      email: 'mfolk2@umich.edu',
      password: '$2b$10$VzTCHvTEIWYM42l/Us.02.iX.cUG.A885PyiTErBtMb5bBdT5H9Ha',
      birthday: '1994-06-08',
    },
    {
      id: 4,
      first_name: 'Alic',
      last_name: 'Flag',
      username: 'aflag3',
      email: 'aflag3@guardian.co.uk',
      password: '$2b$10$VzTCHvTEIWYM42l/Us.02.p.NNPwgrsIq2KxgotpFdcFfOmcqtpPq',
      birthday: '1976-12-05',
    },
    {
      id: 5,
      first_name: 'Mickie',
      last_name: 'Hadfield',
      username: 'mhadfield4',
      email: 'mhadfield4@constantcontact.com',
      password: '$2b$10$VzTCHvTEIWYM42l/Us.02.g26ubNf5TVH.D3WvLy2SBBapx7pn2fi',
      birthday: '1993-02-25',
    },
    {
      id: 6,
      first_name: 'Jourdain',
      last_name: 'Jagoe',
      username: 'jjagoe5',
      email: 'jjagoe5@webnode.com',
      password: '$2b$10$VzTCHvTEIWYM42l/Us.02.Ia9P8Ek1tX0EK0/HHRPQXg6wm1cu1PG',
      birthday: '1984-06-11',
    },
    {
      id: 7,
      first_name: 'Kerk',
      last_name: 'Southouse',
      username: 'ksouthouse6',
      email: 'ksouthouse6@hc360.com',
      password: '$2b$10$VzTCHvTEIWYM42l/Us.02.PhmS4qfjSS86qskQPUsDNpxIUzMg636',
      birthday: '1978-04-21',
    },
    {
      id: 8,
      first_name: 'Hale',
      last_name: 'Learie',
      username: 'hlearie7',
      email: 'hlearie7@lycos.com',
      password: '$2b$10$VzTCHvTEIWYM42l/Us.02.19ZdSUFxs.jTQGMlG3vF4cP251Os21.',
      birthday: '1990-07-05',
    },
    {
      id: 9,
      first_name: 'Xaviera',
      last_name: 'Lumb',
      username: 'xlumb8',
      email: 'xlumb8@linkedin.com',
      password: '$2b$10$VzTCHvTEIWYM42l/Us.02.CpvIijgBUOlylC5FaG0YuGOP5d2bmqq',
      birthday: '1989-09-10',
    },
    {
      id: 10,
      first_name: 'Brent',
      last_name: 'Litster',
      username: 'blitster9',
      email: 'blitster9@csmonitor.com',
      password: '$2b$10$VzTCHvTEIWYM42l/Us.02.oXvfZZmmTYCt1q04ymek0b9C0D2Nthm',
      birthday: '1985-03-15',
    },
    {
      id: 11,
      first_name: 'Alex',
      last_name: 'Park',
      username: 'alex20',
      email: 'alex20@csmonitor.com',
      password: '$2b$10$VzTCHvTEIWYM42l/Us.02.oXvfZZmmTYCt1q04ymek0b9C0D2Nthm',
      birthday: '1986-03-23',
    },
  ]);

  await knex.schema.raw(
    "SELECT setval(pg_get_serial_sequence('user', 'id'), max(id)) FROM \"user\";",
  );
}
