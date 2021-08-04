import {VacationsTypes} from '../vacations/shared/vacations.model';

export const vacations = {
  id: 1,
  teams: [
    {
      name: 'Frontend Team',
      percentageOfAbsent: [0, 2, 0, 0, 1, 22, 2, 2, 2, 2, 11, 1],
      id: 1,
      colorTheme: 1,
      members: [
        {
          name: 'FE_Team_User1',
          id: 1,
          vacations: [
            { startDate: '26.04.2021', endDate: '15.05.2021', type: 'Paid' },
          ],
        },
        {
          name: 'FE_Team_User2',
          id: 2,
          vacations: [
            { startDate: '02.04.2021', endDate: '15.04.2021', type: 'UnPaid' },
            { startDate: '20.04.2021', endDate: '22.04.2021', type: 'UnPaid' },
          ],
        },
      ],
    },
    {
      name: 'Backend Team',
      percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
      id: 2,
      colorTheme: 2,
      members: [
        {
          name: 'FE_Team_User3',
          id: 3,
          vacations: [
            { startDate: '15.03.2021', endDate: '22.04.2021', type: 'UnPaid' },
            { startDate: '24.04.2021', endDate: '04.05.2021', type: 'UnPaid' },
          ],
        },
        {
          name: 'FE_Team_User4',
          id: 4,
          vacations: [
            { startDate: '03.03.2021', endDate: '04.03.2021', type: 'UnPaid' },
            { startDate: '20.03.2021', endDate: '25.03.2021', type: 'UnPaid' },
          ],
        },
      ],
    },
    {
      name: 'C++ Team',
      percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
      id: 3,
      colorTheme: 3,
      members: [
        {
          name: 'FE_Team_User5',
          id: 5,
          vacations: [
            { startDate: '15.04.2021', endDate: '25.04.2021', type: 'UnPaid' },
            { startDate: '12.04.2021', endDate: '12.04.2021', type: 'UnPaid' },
          ],
        },
        {
          name: 'FE_Team_User6',
          id: 6,
          vacations: [
            { startDate: '21.03.2021', endDate: '02.04.2021', type: 'UnPaid' },
            { startDate: '05.04.2021', endDate: '11.04.2021', type: 'UnPaid' },
          ],
        },
      ],
    },
    {
      name: 'Java Team',
      percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
      id: 4,
      colorTheme: 4,
      members: [
        {
          name: 'FE_Team_User7',
          id: 7,
          vacations: [
            { startDate: '15.04.2021', endDate: '22.04.2021', type: 'UnPaid' },
            { startDate: '20.02.2021', endDate: '28.02.2021', type: 'UnPaid' },
          ],
        },
        {
          name: 'FE_Team_User8',
          id: 8,
          vacations: [
            { startDate: '14.05.2021', endDate: '17.05.2021', type: 'UnPaid' },
            { startDate: '18.06.2021', endDate: '22.07.2021', type: 'UnPaid' },
          ],
        },
      ],
    },
  ],
};

export const vacationsTypes: VacationsTypes = [{name: 'UnPaid', key: 1}, {name: 'Paid', key: 2}];
