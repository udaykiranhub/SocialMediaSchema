# Mongoose Ref and Populate Example

## Description

This project demonstrates the use of **Mongoose's `ref` and `populate`** methods to handle relationships between MongoDB documents. It showcases how to manage **Users**, **Posts**, **Followers**, **Liked Posts**, and **Comments** in a MongoDB database using Mongoose.

- **`ref`** is used to reference other collections, enabling the creation of relationships between documents.
- **`populate`** is used to retrieve related data from referenced collections in a single query.

## Features

- Create and manage users with profile information, followers, and posts.
- Establish relationships between users (followers/following).
- Create and manage posts with captions and images, along with likes and comments.
- Use **`populate`** to fetch related data like posts, followers, and comments in a single query.

## Example

### User Schema
The User schema includes fields for name, username, email, password, bio, followers, following, posts, likedPosts, and comments. The **`followers`** and **`following`** fields reference other User documents, while **`posts`**, **`likedPosts`**, and **`comments`** reference Post and Comment documents.

### Post Schema
The Post schema includes fields for caption, image, createdBy (referencing a User), likes (array of User references), and comments (array of Comment references).

### Using `populate`
You can retrieve related data by using the **`populate`** method, which automatically fetches referenced documents.

