# Gardening-Tips
# Live Link: https://gardening-tips-platform-client.vercel.app
![Gardening_Tips](https://i.ibb.co.com/6PdGrYD/Screenshot-2024-10-15-015656.png)

## Project Overview

The Gardening Tips & Advice Platform is a comprehensive web application designed for gardening enthusiasts and professionals. The platform allows users to share, discover, and interact with valuable gardening tips and knowledge. It provides insightful plant care advice, seasonal guides, and techniques to enhance gardening experiences. The frontend is built using **Next.js** and **TypeScript** to offer a responsive, interactive, and user-friendly experience across devices.

## Features

### User Authentication
- **Login/Registration**: Users can securely sign up and log in with email and password using JWT-based authentication.
- **Password Recovery**: Users can recover and reset their password.
- **Profile Management**: Users can update their profile information, including profile picture and personal details.

### Rich Text Editor for Post Creation
- Users can create and edit posts using a rich text editor, with support for images and multimedia.
- Posts can be categorized under topics such as Vegetables, Flowers, Landscaping, etc.
- Users can tag posts as Premium content, accessible only to verified users.

### Social Interaction
- **Upvote/Downvote System**: Users can upvote or downvote posts, with sorting options based on the number of upvotes.
- **Commenting**: Users can comment on posts and edit or delete their comments. Optionally, users can reply to comments.
- **Following System**: Users can follow/unfollow other users and view posts from followed users.

### Premium Content & Payments
- **Verified Profiles**: Users can verify their profiles once their post receives at least one upvote, and unlock access to premium content by paying through **Aamarpay**.
- **Payment Integration**: Integration with **Aamarpay** for accessing exclusive content.
- **Profile Badge**: Verified users receive a badge that is displayed on their profile.

### News Feed
- A dynamic news feed displaying the latest gardening tips and guides.
- Infinite scroll to load more posts dynamically.
- Searching and filtering options to sort posts by category and upvotes.

### Favorites Section
- Users can mark posts as "Favourite" and access them in a dedicated section of their profile.

### Animations and UI Enhancements
- Micro animations such as hover effects and smooth transitions for improved user experience.

### Image Gallery Section
- An image gallery to showcase recent gardening images, enhancing visual engagement.

### Search & Filter
- Users can search for gardening tips or filter posts based on category or popularity.
- Posts are sorted by upvote count when searching or filtering.

### Responsive Design
- The platform is designed to be fully responsive, ensuring a seamless experience on both mobile and desktop devices.

## Pages

### Public Pages
- **Home**: A landing page with gardening tips and a dynamic news feed.
- **About Us**: Information about the platform and its mission.
- **Contact Us**: A contact form for user inquiries and support.

### Authenticated User Pages
- **Dashboard**: A personalized user dashboard displaying posts from followed users and other relevant content.
- **Profile Page**: Displays the user’s posts, followers, following, and a section for profile updates.
- **Post Creation Modal**: A distraction-free modal for creating and editing posts.

### Admin Pages
- **Admin Dashboard**: A panel for administrators to manage users, posts, and payments, with charts for monthly activity.


## Technologies Used
- **Next.js**: For server-side rendering and frontend structure.
- **TypeScript**: For type-safe JavaScript development.
- **JWT Authentication**: For secure user authentication.
- **Aamarpay/Stripe**: Payment integration for premium content access.
- **Tailwind CSS**: For responsive UI design and styling.
