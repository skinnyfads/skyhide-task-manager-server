# Skyhide Task Manager Server

## Overview

This is simple Task Manager API. Users will be able to create tasks, mark task as done, group multiple tasks together on a board, and more.

The API consists on four parts.

1. User
2. Board
3. Task
4. Sub Task

**User** is the person who can create, remove or manage a task. A user can have a username that is unique and cannot be reused by other users.

**Board** is a place to group many tasks. A Board can contain different tasks and divide them according to their status such as "Done", "Doing", or etc.

**Task** is the main thing in this API. A task can have a title, description, status, and can contain many sub-tasks. For example: "Making coffee"

**Sub Task** are small parts of the task. You could say these are the steps of a task. Let's take the example of the "Making Coffee" task, the sub-tasks could be: "Adding Sugar", "Pouring water", or "Serving".

With this in mind, I hope you grasp the concepts and have better understanding. If so, let's read together the usage of the API and try to implement!

## Usage

### Include Axios

```js
import axios from "axios";
```

### Define base url

```js
const baseUrl = "server url";
```

### User Endpoint

**Create User**

```js
const options = {
  method: "POST",
  url: baseUrl + "/users/create",
  headers: { "Content-Type": "application/json" },
  data: { username: "skinny", password: "fads" },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

**Remove User**

```js
const options = { method: "DELETE", url: baseUrl + "/users/delete/:username" };

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

**Login**

```js
import axios from "axios";

const options = {
  method: "POST",
  url: baseUrl + "/users/login",
  headers: { "Content-Type": "application/json" },
  data: { username: "skinny", password: "fads" },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

### Board Endpoint

**Create Board**

```js
const options = {
  method: "POST",
  url: baseUrl + "/boards/create",
  headers: { "Content-Type": "application/json" },
  data: { boardname: "First Board", username: "skinny" },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

**Remove Board**

```js
const options = {
  method: "DELETE",
  url: baseUrl + "/boards/delete/:boardId",
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

**Get Public Boards**

This will get all public boards from other users
By default board is private

```js
const options = { method: "GET", url: baseUrl + "/boards/public" };

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

**Get All Boards**

If user is authenticated, they will be able to get their own boards. Doesn't matter if a board is private or public. User can only see their own boards and can't see other user's private boards

```js
const options = { method: "GET", url: baseUrl + "/boards/user/skinny" };

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

### Task Endpoint

**Create Task**

```js
const options = {
  method: "POST",
  url: baseUrl + "/tasks/create",
  headers: { "Content-Type": "application/json" },
  data: {
    title: "First Task",
    boardId: "63c36353368eb783a8f48f7c",
    description: "This is task #1",
    status: "Not done",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

**Remove Task**

```js
const options = {
  method: "DELETE",
  url: baseUrl + "/tasks/delete/:taskId",
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

**Get All Tasks**

This will get all tasks from specific boards and specific user

```js
const options = {
  method: "GET",
  url: baseUrl + "/tasks/board/:boardId",
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

**Change Task Status**

```js
const options = {
  method: "POST",
  url: baseUrl + "/tasks/changeStatus/:taskId",
  headers: { "Content-Type": "application/json" },
  data: { status: "Done" },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

### Sub Task Endpoint

**Create Sub Task**

```js
const options = {
  method: "POST",
  url: baseUrl + "/subtasks/create",
  headers: { "Content-Type": "application/json" },
  data: { title: "First Sub Task", taskId: "63c3b155fadd42f95c5ce453" },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

**Remove Sub Task**

```js
const options = {
  method: "DELETE",
  url: baseUrl + "/subtasks/delete/:subTaskId",
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

**Get All Sub Tasks**

This will get all the Sub Tasks from specific Tasks

```js
const options = {
  method: "GET",
  url: baseUrl + "/subtasks/task/:taskId",
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

**Change Sub Task Status**

We can switch the status of a Sub Task. It can only have 2 status which is done. The value is either `true` or `false`

```js
const options = {
  method: "POST",
  url: baseUrl + "/subtasks/switchStatus/:subTaskId",
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```
