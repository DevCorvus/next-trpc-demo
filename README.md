# Next tRPC demo

A Next.js demo app with tRPC as API, NextAuth, Prisma (SQLite), Zod validation and some other fun tools.

You are free to explore and use the code at your convenience. I hope you find it useful and thanks for reading. ❤️

## Development

This project is based on my [GraphQL demos](https://github.com/DevCorvus/nestjs-graphql-demo). It is following an alternate path this time with tRPC instead of GraphQL.

I don't think it's fair to compare GraphQL with tRPC because they try to solve different problems. tRPC is a framework for building end-to-end typesafe APIs that excels in ergonomics and general DX in full-stack projects using Typescript. IMO, tRPC has by far the best developer experience when it comes to the kind of project in which it aims to fit in: Full-stack web applications with Typescript, no doubt about it.

I thought about making just a standalone tRPC API but it didn't make much sense considering that half of the purpose of tRPC involves the client-side. Having this in mind, I decided to integrate it with Next.js which has one of the best integrations for tRPC. I kept the UI as simple as possible, it's almost like raw HTML visually but it has all the functionality that I intented to show for this demo.

_\- DevCorvus_
