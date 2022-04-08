# PollDash

### Thoughts

This was very fun. I've never used TypeORM or NestJS and got rather obsessed. I wish I had scoped things a little better, and that I had more time to learn this particular query building syntax so I could be more concise. There are similarities with the Laravel Eloquent ORM, but TypeORM isn't quite as developed yet - but as far as JS ORM's it's great.

I initially approached things very methodically with the aim of building something that had an architecture that could be expanded with more features rather than just meeting the short-term requirements - just in principle. If I had more time I would continue refactoring the things that were completed towards the end. I also would have used Bootstrap or Material Design instead of doing all the SCSS in order to reduce some overhead in style writing.

We talked about Generic Types, and this gave me a good oppurtinity to utilize them more. This is a new implementation I've tried for redux-thunks in order to make maximally reusable and typed thunks. It worked really well.

```typescript
File: /client/redux/thunks/Generic.ts

export async function findOne<R, C>(dispatch: WrappedThunkDispatch<never>, ...options: any[]) {
  const findOneThunk: WrappedThunkActionCreator<Data<any>> = (
    prefix: string,
    id: number,
    callback?: C
  ) => async (
    dispatch: WrappedThunkDispatch<AxiosStatic>,
    getState: () => State,
    Http: AxiosStatic
  ): Promise<Data<R>> => {
    try {
      const response: Data<R> = await HttpService.findOne<R>(Http, { prefix, id })
      if (typeof callback === 'function') {
        await callback(response)
      }
      return response
    } catch (err) {
      throw err
    }
  }

  return await dispatch(findOneThunk(...options))
}

Usage of a "Generic Thunk" (create(), but same idea): /client/redux/maps/dispatch.ts

...
createDistribution: async (options: Create<CreateDistribution>) => {
  return await GenericThunk.create<Distribution, CreateDistribution, Function>(
    dispatch,
    'distributions',
    options.body,
    (response: Model<Distribution>): void => {
      dispatch(DistributionAction.create(response))
    }
  )
},
...
```

---

### Setup

1. Add the .env files to /client and /server roots.
2. Using `NodeJS 14.4.0`

---

### Start Commands

##### Server (NestJS, Typescript, Postgres, TypeORM)

1. `npm i`
2. `npm run typeorm:migration:run` - Runs migration
   - `npm run typeorm:migration:revert` - Reverts migration
3. `npm run prod:build` - Builds /dist
4. `npm run prod:start` - Starts from /dist/main.js

##### Client (Server Side Rendered ReactJs, NodeJS, Express)

1. `npm i`
2. `npm run prod:build` - Builds production bundles
3. `npm run prod:start` - Starts Express server for SSR, ready

##### Getting Started

1. Admin: admin@example.com, ******** (as in .PDF)
2. Feel free to register other self-registering Users, or create more as an Admin (you can create Admins, too).
3. Created User/Admins have a password matching their email.
4. Create some Groups, and add Users to them.
5. Create some Polls, and execute Distributions.
6. Find Mocks after executing Distribution in "Distribution Meta" page. Or, use the provided SendGrid API if you are registering real email accounts.
7. Review "Response History", "Distribution Meta", and "Single User" pages after some activity.

---

### Features

- Multiple admins with individually scoped Users, Groups, Polls, Questions, and Distributions (of polls)
- Admins can create other Users, or Admins *Admin created users have a password of their email*
- Users can be placed into admin Groups and Groups can be Distributed Polls
- Repeater field can be used to build Polls with Questions
- Each Distribution can be tracked, and each question is a "yes" | "no" enum response. The statistics are monitored.
- JWT authentication implemented for role-based access control using NestJS decorators
- Normal users can login, but only have partial access to views
- You may be logged out to take the survey you are sent, or logged in
- The survey email can be mocked but it can also be sent with SendGrid API
- On boot we seed the table with our admin@example.com
- The survey link uses a decoded JWT token for tracking
- More stuff...

---

### Pages

##### Home `/`

   - Public
   - Landing page

##### Login `/users/login`

   - Public
   - login page

##### Register `/users/register`

   - Public
   - registration page (for self-registering users open to all-admin scopes)

##### Dashboard Main `/auth/{id}`

   - User Controlled
   - general information (a little out of date, you can see that a few of my expectations didn't have time to be completed)

##### User Management `/auth/{id}/users`

   - Admin Controlled
   - create and view your scoped users

##### Group Management `/auth/{id}/groups`

   - Admin Controlled
   - Create groups and add users. Users that self register are availaable to your scope.

##### Poll Delegation `/auth/{id}/polls`

   - Admin Controlled
   - Create Polls and send distributions. You can use SendGrid, or Mock the email.

##### Distribution Meta `/auth/{id}/distributions`

   - Admin Controlled
   - Mocks links go here. We dig into each admin-created distribution of a poll. A Poll can be distributed multiple times, and each distribution has responses. Here we can view a lot of details about the distribution(s) state.

##### Response History `/auth/{id}/responses`

   - AUser Controlled
   - View Auth Responses, Received Responses, and Sent Distributions. General Overview.

##### Single User `/auth/{id}/users/{userId}`

   - Admin Controlled
   - Accessible only through link in Response History. View individual user statistics.

### Issues Encountered

1. On initial compile of NestJS: `No valid exports main found for '/Users/danielgriffiths/Desktop/bryllynt-dash/polldash/node_modules/uuid'`
   - Solution: Update NodeJS to 14.4.0
2. Experimenting with TypeORM, wish I could be more acquainted with the Entity and Repository API's.

---
