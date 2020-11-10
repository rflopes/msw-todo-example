import {MockedRequest, rest} from 'msw';

let todos = [
    {
        name: "TODO-1",
        author: "johnDoe"
    },
    {
        name: "TODO-2",
        author: "johnDoe"
    },
    {
        name: "TODO-3",
        author: "janeDoe"
    },
    {
        name: "TODO-4",
        author: "johnDoe"
    },
    {
        name: "TODO-5",
        author: "johnDoe"
    }
];
export const handlers = [
    // Handles a POST /login request
    rest.post('/login', (req: MockedRequest<string>, res, ctx) => {
        const {username} = JSON.parse(req.body);

        console.log(username, req.body);
        return res(
            ctx.json({
                id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
                username,
                firstName: 'John',
                lastName: 'Maverick',
            })
        )
    }),
    // Handles a GET /todos request
    rest.get('/todos', (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(todos)
        );
    }),

    // Handles a GET /todos request
    rest.post('/todos', (req: MockedRequest<string>, res, ctx) => {
        const {username, todo} = JSON.parse(req.body);

        todos.push({name: todo, author: username});
        return res(
            ctx.status(200),
            ctx.json(todos)
        );
    }),
]