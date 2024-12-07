# NewsHub

## Description

NewsHub is a web application that allows you to search and filter news articles from various sources. It uses the NewsAPI, The Guardian, and The New York Times APIs to fetch and display news articles.

## Features

- Search for news articles by title, description, or content.
- Filter news articles by category, source, author, and date.
- Save your favorite news articles to your account.
- View your saved news articles in the "Saved" tab.
- Personalize your feed by selecting your favorite categories, sources, authors, and dates.

## Installation

1. Clone the repository:

```
git clone https://github.com/adibaliga/newshub.git
```

2. cd into the project directory:

```
cd newshub
```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm run dev
```

## local installation via docker

Build the docker image:

```
docker build -t vite-react-app .
```

Run the docker container:

```
docker run -p 5173:5173 vite-react-app
```

### Environment Variables

- `VITE_NEWSAPI_API_KEY`: The API key for the NewsAPI.
- `VITE_GUARDIAN_API_KEY`: The API key for The Guardian.
- `VITE_NYT_API_KEY`: The API key for The New York Times.
