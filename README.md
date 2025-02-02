# YouTube Clone App

A simple YouTube Clone built using **React, TypeScript, Tailwind CSS, and YouTube API**. This app allows users to browse YouTube videos, search for videos, and watch videos seamlessly.

## Features

- **Home Page:** Displays trending videos fetched from the YouTube API.
- **Search Functionality:** Search for videos using the YouTube API.
- **Watch Videos:** Watch selected videos with relevant details.
- **Responsive UI:** Styled with Tailwind CSS for a modern and adaptive design.

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/iamshbr/Youtube-Clone.git
cd your-repository
```

### 2. Install Dependencies

```sh
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add the following:

```env
VITE_APP_YOUTUBE_API_KEY=Your_API_KEY
```

Replace `Your_API_KEY` with your actual YouTube API key.

### 4. Run the App

```sh
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173/`.

## Technologies Used

- **React** (UI Library)
- **TypeScript** (Static Typing)
- **Tailwind CSS** (Styling)
- **YouTube API** (Fetching Videos)
