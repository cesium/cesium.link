[asdf-vm]: https://asdf-vm.com/
[auth0-docs]: https://auth0.com/docs/get-started/auth0-overview/create-applications

# 🚀 Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

## 📥 Prerequisites

The following software is required to be installed on your system:

- [Node.js 16.13+](https://nodejs.org/en/download/)

We recommend using [asdf version manager][asdf-vm] to install and manage all the
programming languages' requirements.

## 👽 Third-party dependencies

This project uses the [Auth0](https://auth0.com/) for authentication and
authorization (with a custom javascript script). You need to create an App for
a SPA to interact with it in development [here][auth0-docs].

## 🔧 Setup

Install all dependencies.

```
npm install
```

Then, create your local environment file and fill in all the required details.

```
cp -n .env.sample .env.local
```

## 🔨 Development

Starting the development server.

```
npm run develop
```

Test your code against common guidelines.

```
npm run test
```

Lint your code.

```
npm run lint
```

Format your code.

```
npm run format
```

## 🔗 References

You can use these resources to learn more about the technologies this project
uses.

- [Getting Started with React](https://reactjs.org/docs/getting-started.html)
- [Learn Next.js](https://nextjs.org/learn).
