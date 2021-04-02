import { Knex } from 'knex';
import tableNames from '@constants/tableNames';

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableNames.task).del();
  // Inserts seed entries
  await knex(tableNames.task).insert([
    {
      id: 1,
      title: 'Phasellus sit amet erat.',
      description:
        'Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.',
      realisation_date: '2020-01-18',
      user_id: 1,
    },
    {
      id: 2,
      title: 'In eleifend quam a odio.',
      description:
        'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
      realisation_date: '2020-06-25',
      user_id: 2,
    },
    {
      id: 3,
      title: 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
      description:
        'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
      realisation_date: '2020-09-10',
      user_id: 3,
    },
    {
      id: 4,
      title:
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.',
      description: 'Nullam varius.',
      realisation_date: '2020-08-20',
      user_id: 4,
    },
    {
      id: 5,
      title:
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      description:
        'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
      realisation_date: '2020-08-09',
      user_id: 5,
    },
    {
      id: 6,
      title: 'Sed accumsan felis.',
      description:
        'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.',
      realisation_date: '2020-03-26',
      user_id: 6,
    },
    {
      id: 7,
      title: 'In hac habitasse platea dictumst.',
      description:
        'Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.',
      realisation_date: '2020-08-21',
      user_id: 7,
    },
    {
      id: 8,
      title: 'Nullam sit amet turpis elementum ligula vehicula consequat.',
      description:
        'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
      realisation_date: '2020-08-09',
      user_id: 8,
    },
    {
      id: 9,
      title: 'Suspendisse potenti.',
      description:
        'In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.',
      realisation_date: '2020-01-05',
      user_id: 9,
    },
    {
      id: 10,
      title: 'Morbi a ipsum.',
      description:
        'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.',
      realisation_date: '2020-08-27',
      user_id: 10,
    },
  ]);

  await knex.schema.raw(
    "SELECT setval(pg_get_serial_sequence('task', 'id'), max(id)) FROM task;",
  );
}
