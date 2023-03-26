# Twitter Clone

This is a Twitter clone project that aims to replicate some of the core features of the popular social media platform Twitter.

## Features

The Twitter clone currently supports the following features:

- User registration and login
- Posting tweets
- Liking and retweeting tweets
- Following and unfollowing other users
- Viewing a user's profile page and their tweets
- Home feed with tweets from followed users
- Notifications for new followers, likes, and retweets

## Technologies Used

The following technologies were used to build this Twitter clone:

- Frontend: React, Tanstack/React-Query, Tailwind CSS
- Backend: Spring, Java, MongoDB
- Authentication: JSON Web Tokens (JWT)

## Installation and Setup

To run the Twitter clone locally, follow these steps:

1. Clone the repository
2. Install dependencies for both the frontend and backend using `npm install` in their respective directories
3. Create a `.env` file in the backend directory and add the following environment variables:
    - MONGO_DATABASE=twitter-db
    - MONGO_USER=tunahandundar2221
    - MONGO_PASSWORD=15724939796tT.
    - MONGO_CLUSTER=twitter-cluster.oeumwoc.mongodb.net
    - SECRET_KEY=my-secret-key
5. Start the backend server using `npm run serverstart` in the backend directory
6. Start the frontend server using `npm run dev` in the frontend directory

## Future Improvements

Here are some potential improvements that could be made to the Twitter clone in the future:

- Implementing real-time updates using WebSockets
- Adding more advanced search functionality
- Enhancing the user interface with animations and transitions

## Contributing

Contributions to the Twitter clone are always welcome! To contribute, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with descriptive commit messages
4. Push your changes to your fork
5. Create a pull request from your fork to the main repository


## License

This Twitter clone project is licensed under the [MIT License](LICENSE).


