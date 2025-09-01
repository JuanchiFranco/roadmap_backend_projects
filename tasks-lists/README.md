# CLI-Task-Tracker

This is a proposed solution to the [CLI task tracker challenge](https://roadmap.sh/projects/task-tracker) from [roadmap.sh](https://roadmap.sh/).

## Features

- List all tasks
- List all tasks by status
- Add Tasks
- Update Tasks
- Delete Tasks
- change the status of tasks to in progress and done

## Prerequisites

- Node.js installed on your system.
- Basic knowledge of command-line usage.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/JuanchiFranco/CLI-Task-Tracker.git
    ```

    ## Usage

    ### List All Tasks
    To list all tasks, use the following command:
    ```bash
    node index.js list
    ```

    You can also filter tasks by status by passing the status as an argument:
    ```bash
    node index.js list "in-progress"
    node index.js list "done"
    node index.js list "todo"
    ```

    ### Add a Task
    To add a new task, use the following command:
    ```bash
    node index.js add "Task description"
    ```

    ### Update a Task
    To update an existing task, use the following command:
    ```bash
    node index.js update 1 "New Description"
    ```

    ### Delete a Task
    To delete a task, use the following command:
    ```bash
    node index.js delete 1
    ```

    ### Mark a Task as In Progress
    To mark a task as in progress, use the following command:
    ```bash
    node index.js mark-in-progress 1
    ```

    ### Mark a Task as Done
    To mark a task as done, use the following command:
    ```bash
    node index.js mark-done 1
    ```