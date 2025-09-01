# Personal-blog

This is a proposed solution to the [Personal Blog Challenge](https://roadmap.sh/projects/personal-blog) from [roadmap.sh](https://roadmap.sh/).

## Features

The blog have two sections: a guest section and an admin section.

- Guest Section — A list of pages that can be accessed by anyone:
    - **Home Page**: This page will display the list of articles published on the blog.
    - **Article Page**: This page will display the content of the article along with the date of publication.

- Admin Section — are the pages that only you can access to publish, edit, or delete articles.
    - **Dashboard**: This page will display the list of articles published on the blog along with the option to add a new article, edit an existing article, or delete an article.
    - **Add Article Page**: This page will contain a form to add a new article. The form will have fields like title, content, and date of publication.
    - **Edit Article Page**: This page will contain a form to edit an existing article. The form will have fields like title, content, and date of publication.

## Prerequisites

- Node.js installed on your system.
- Basic knowledge of command-line usage.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/JuanchiFranco/Personal-blog.git
    ```

## Usage
1. Navigate to the `backend` directory:
    ```bash
    cd Personal-blog/backend
    ```

2. Install the backend dependencies:
    ```bash
    npm install
    ```

3. Start the backend development server:
    ```bash
    npm run dev
    ```

4. Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

5. Install the frontend dependencies:
    ```bash
    npm install
    ```

6. Start the frontend development server:
    ```bash
    npm run dev
    ```