import express, { Request, Response, NextFunction } from "express";
import { createTodo, getAllTodos, updateTodo, deleteTodo } from "./todos.service.js";


const todosRouter = express.Router();

//* CREATE TODO
todosRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const user_email = req.user_email;
  const { title, progress, date } = req.body;
  try {
    const todo = await createTodo(title, progress, date, user_email)
    if (todo) {
      res.status(200).json(todo)
    }
  } catch (error) {
    next(error)
  }
})

//* GET ALL TODO  
todosRouter.get("/:userEmail", async (req: Request, res: Response, next: NextFunction) => {
  const { userEmail } = req.params;
  try {
    const todo = await getAllTodos(userEmail);
    if (todo.length) {
      return res.status(200).json(todo);
    } return res.status(204).json("No todos found!");
  } catch (error) {
    next(error)
  }
})

//* EDIT A TODO
todosRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const user_email = req.user_email;
  const { id } = req.params;
  const { title, progress, date } = req.body;
  try {
    const todo = await updateTodo(title, progress, date, parseInt(id), user_email)
    if (todo) {
      res.status(200).json(todo)
    } else {
      res.status(204).json("No todo found!");
    }
  } catch (error) {
    next(error)
  }
})

//* DELETE TODO
todosRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const user_email = req.user_email;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ 'message': 'Todo ID is required' })
  }
  try {
    const todo = await deleteTodo(parseInt(id), user_email);
    if (todo) {
      res.status(200).json(todo)
    } else {
      res.status(403).json('You are only able to delete your own todo');
    }
  } catch (error) {
    next(error)
  }
})


export default todosRouter;