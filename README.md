# Oslo Met Sanity tutorial

In this workshop we will set up a React web application hosted on AWS. We will use AWS Amplify to simply connect our frontend (React) app onto our backend (AWS).

In the end, this will result in a fullstack application with

- Authentication
- API in GraphQL with realtime data
- Database storage connected to our API

You do not need any backend developer skills to complete this workshop. All backend stuff is being taken care of by AWS Amplify.

What you need is

- Node/NPM installed on your computer
- An AWS account (requires credit card on signup, but we will stay within the free-tier)
- Minor git knowledge

> **Note:** If you prefer to go your own route, this is a good tutorial:
> https://docs.amplify.aws/start/getting-started/installation/q/integration/react

## Get started

To get started, clone this repository by copying this into your terminal:

```
git clone github.com
cd oslomet-amplify-workshop
npm install
```

_Q: Why do we use your github repository instead of setting everything up ourselves?_

1. In this repository, I have set up the frontend to contain all the necessary npm packages for Amplify. The necessary packages are `aws-amplify` and `@aws-amplify/ui-react`
2. There's also comments around the whole app to help you set up Amplify in the application, step by step - hopefully for a better understanding.

Setup and initialise AWS Amplify in the directory

First install the amplify package globally

```
npm install -g @aws-amplify/cli
```

```
amplify configure
```

```
amplify init
```

During `amplify init`, give the project a name and when prompted, choose `AWS profile` to pick the profile you set up in the previous step.

## Authentication

When this is done, we can now start to add features to our app. We want to add Authentication and to do that we use the amplify CLI `amplify add`

```
amplify add auth

```

Configurations

```
 ? Do you want to use the default authentication and security configuration?
 > Default configuration
 ? How do you want users to be able to sign in?
 > Username
 ? Do you want to configure advanced settings?
 > No, I am done.
```

For configurations, give it a name, choose `Default configuration`, `Email` and `No` to advanced settings.

And that's it. You can now update AWS with your new features:

`amplify push`

Now it's time to test out the frontend authentication. For this workshop, we'll use the AWS Amplify Authenticator wrapper.

First start the application in development mode. Run ´npm start´ from the root. Check out the todo list app, and mess around with it.

It's important that you test the application before proceeding. Run `npm start` in the terminal and mess around in the app. Try to complete tasks in the todo list, refresh the window etc.

As of now, everything is just local state in React, and with no authentication system. To change the latter, proceed with these steps:

> **Note:** Every time there's a TODO it means something needs to be done in the React code.

### TODO #1:

Go to the `src/index.js` file and uncomment the 3 lines of code there.

### TODO #2

Go to the file `src/App.js`. You'll see that `withAuthenticator` has been commented out. Remove the comment from the import and where it should be used.

Now go back into the web app and refresh the page. We now have an authentication system where you can't see the content of our application before we sign in.

## Registering an account to see the app

1. Register a user and sign in with it. In our demo, you need to add both email and phone number. This can be controlled but we won't get into that now.
2. Go to your email address and find the verification code to complete the registration process.
3. Sign in with the username + password you used

When you sign in, you can now see the application as it were before.

## Creating the API

Back in our terminal window, we want to use amplify to add an API:

```
amplify add api

? Please select from one of the below mentioned services:
> GraphQL

? Provide API name:
> enter a name, e.g. "oslometapi" or the default one

? Choose the default authorization type for the API Amazon Cognito User Pool
> Use a Cognito user pool configured as a part of this project.

? Do you want to configure advanced settings for the GraphQL API
> No, I am done.

? Do you have an annotated GraphQL schema?
> No

? Choose a schema template:
> Single object with fields (e.g., “Todo” with ID, name, description)

GraphQL schema compiled successfully.

? Do you want to edit the schema now?
> Yes

? Choose your default editor:
> Visual Studio Code

Successfully added resource oslometsanityworksho locally
```

What we did in this process was to create the API feature with GraphQL. This generates a `schema.graphql` file.

If you were given the opportunity to edit this file during the creation process, you should now be looking at that file. If not, find it at this path: `/amplify/backend/api/*name*/schema.graphql`.

This is the model of our Database and API. We can add a bunch of models here, but for this demo we will use only this one Todo model.

Edit the contents like so:

```graphql
type Todo @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  task: String!
  completed: Boolean!
}
```

We have simply edited which values we want in the database, and configured it with authentication. Only the owner of the Todo item should be allowed to use CRUD (Create, Read, Update, Delete) operations.

Save the file and go to the terminal window to push the updates to our serverless backend:

`amplify push`

You should see in the Category box that an API has been added to be "created" in the serverless backend, and that Auth has the status "No change".

When pushing for the first time, you also need to answer a couple of prompts. Here you can basically click enter to all questions, to use the defaults:

```
? Do you want to generate code for your newly created GraphQL API
> Yes

? Choose the code generation language target
> javascript

? Enter the file name pattern of graphql queries, mutations and subscriptions
> src/graphql/\*\*/\*.js

? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions
> Yes

? Enter maximum statement depth [increase from default if your schema is deeply nested]
> 2

⠋ Updating resources in the cloud. This may take a few minutes...
```

When this step is done, we have completed all the work with Amplify.

If everything was done correctly, we can now stop doing backend stuff. We have a full **Authentication** system with an **API** using **GraphQL** technology to CRUD data in a **Document Database**.

## Adding API functionality to our code

A part of creating the API was saying "Yes" to have GraphQL code automatically generated.

GraphQL generated code can be found under `src/graphql/**/*`.

We will add this functionality to our code, to make every change we do in the webapp be stored in a database.

These are some long steps to follow, but all in all you will only have to modify 4 files, so just follow the order of the TODO's and you should be fine!

### TODO #3:

In the file `src/components/TodoList.js` there are 6 TODOS for the third step. We need to follow them all.

We also needs to uncomment the imports in `src/hooks/useServerlessCRUD.js` and remove the placeholders.

This will make sure the data is up to date with the database.

We start by uncommenting the useServerlessCRUD() hook, with the CRUD functions which will to graphql operations on the database.

Then, we replace the old useState hook with a new one, which has empty default state.

Uncomment the useEffect hook which makes sure that data is retrieved from the database when we start the app.

And lastly, uncomment the 3 usages of createServerless, deleteServerless and updateServerless.

The app will function as it used to, but now you can refresh the window and see that all todo items are persisted.

<details>
<summary>What are hooks?</summary>

[Official documentation](https://reactjs.org/docs/hooks-intro.html)

**useState()**

Hooks are mainly state handlers in React. They can be used to get and set state.

**useEffect()**

Hooks can also do "something" on the first render, every render, or when some variable
hanges.

**useCustomHooks()**

We have a couple of custom hooks in this application found in the `src/hooks/*` folder. These are used to move logical code out of our components, so that a component can be as simple as possible.

</details>

Try to add, delete, update and mess up the todos. If you spam for example delete, one of the server requests might fail, but the app shouldn't fail.

### TODO #3.5:

Something you also can do is go to the file `src/components/Todo.js` and uncomment html block which currently is commented.

This will show you when the task was updated last, and who it updated was by.

Try to add a todo, look at the updated text. Notice that when you add a new task, it will only say "Updated 0 minutes ago by" instead of anything useful.

However, if you refresh the window, the data are retrieved from the database, and both time and owner should be there.

Let's solve this issue by adding real-time subscription data.

### TODO #4: Adding real time subscriptions.

We will have to both uncomment some code, and remove some code.

Start by going back to `src/components/TodoList.js` and look for **TODO #4**. Hint, it's only one of them at the top of the component.

When you remove this code block, the previous useState will fail. Remove that old code, and everywhere it's used. This is explained in-depth inside the TODO #4 comment.

After you have done this, technically you should be done and already have real time data-flow.

Before you test this, go into the file `src/hooks/useServerlessSubscriptions`. Uncomment the imports at the top, and read the comments there. The code is a bit advanced, and hides a lot of magic done by Amplify.

What is interesting is that the same logic you used to have in `TodoList.js` has now been moved into the subscriptions. This includes adding, removing and updating a todo.

## Testing the app with real-time subscriptions

To test this out, first try to add, remove and update some todos.

Then, to make it more interesting: Open an incognito window in your browser and go to the same localhost:3000 which our app is running at.

Sign in with the same user, and see your todos there. Now keep the windows open next to eachother and add a todo in one window. You'll notice that the todo is updated in the other window too.

# Important last step

If you want to remove the backend service from the cloud before you forget about it, you need to run this command in the terminal

```
amplify delete
```

> You should do this because if you forget it, and it stays up for many years hosted online, someone can find it, sign in to it and spam the databases. This will be costly in the end.

> During your free-tier year, it takes around 10 million request to actually start costing a few cents, so it's no real danger yet, but you should still be completely sure about these things!!
