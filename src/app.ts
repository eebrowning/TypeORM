import * as express from "express"
import { Request, Response } from "express"
// import { User } from './entity/user.entity'
import { User } from './entity/User'

import { myDataSource } from "./data-source"
import { createUserSchema } from "./validation/userValidation"
// const express = require('express');
// const User = require('./entity/user.entity')
// const { myDataSource } = require('./data-source')

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: Error) => {
        console.error("Error during Data Source initialization:", err)
    })
// create and setup express app
const app = express();
app.use(express.json())

// register routes
app.get("/users", async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(User).find();;
    console.log('REQUEST MADE TO /users', users)
    return res.json(users)
    // return res.json()
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).findOneBy({
        id: +req.params.id,
    })
    return res.send(results)
})


//add JOI middleware
app.post("/users", createUserSchema, async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

//add JOI middleware
app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: +req.params.id,
    })
    myDataSource.getRepository(User).merge(user, req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
})
// start express server
app.listen(8000)
