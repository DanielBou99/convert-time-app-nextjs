export interface TaskI {
    id: number,
    name: string,
    branch: string,
    jiraUrl?: string,
    gscId?: string,
    status: number,
    description?: string,
};

export const allTasks: TaskI[] = [
    {
        id: 1,
        name: 'Daniel Bou',
        branch: 'branch-1-teste',
        jiraUrl: 'https://mui.com/material-ui/react-link/',
        gscId: 'GSC-111111',
        status: 1,
        description: 'Asdoa teoks odks dos kosdkso ksd'
    },
    {
        id: 2,
        name: 'Daniel Bou',
        branch: 'branch-2-teste',
        jiraUrl: 'https://mui.com/material-ui/react-link/',
        gscId: 'GSC-2222222',
        status: 1,
        description: 'Asdoa teoks odks dos kosdkso ksd'
    },
    {
        id: 3,
        name: 'Daniel Bou',
        branch: 'branch-3-teste',
        jiraUrl: 'https://mui.com/material-ui/react-link/',
        gscId: 'GSC-3333333',
        status: 1,
        description: 'Asdoa teoks odks dos kosdkso ksd'
    },
    {
        id: 4,
        name: 'Daniel Bou',
        branch: 'branch-4-teste',
        jiraUrl: 'https://mui.com/material-ui/react-link/',
        gscId: 'GSC-3333333',
        status: 2,
        description: 'Asdoa teoks odks dos kosdkso ksd'
    },
    {
        id: 5,
        name: 'Daniel Bou',
        branch: 'branch-5-teste',
        jiraUrl: 'https://mui.com/material-ui/react-link/',
        gscId: 'GSC-3333333',
        status: 2,
        description: 'Asdoa teoks odks dos kosdkso ksd'
    },
    {
        id: 6,
        name: 'Daniel Bou',
        branch: 'branch-6-teste',
        jiraUrl: 'https://mui.com/material-ui/react-link/',
        gscId: 'GSC-3333333',
        status: 2,
        description: 'Asdoa teoks odks dos kosdkso ksd'
    },
    {
        id: 7,
        name: 'Daniel Bou',
        branch: 'branch-7-teste',
        jiraUrl: '',
        gscId: '',
        status: 2,
        description: ''
    }
]