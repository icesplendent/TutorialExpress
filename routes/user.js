/* eslint-disable no-import-assign */
/* eslint-disable no-param-reassign */
import express from 'express';
import { v4 as uuid } from 'uuid';
import userData from '../models/user';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.json(userData);
});
userRouter.post('/', async (req, res) => {
  const newUser = {
    id: uuid(),
    name: req.body.name,
    age: req.body.age,
  };

  try {
    userData.forEach((x) => {
      if (x.name === req.body.name) {
        res.end('Somebody has the same name as yours');
      }
    });

    userData.push(newUser);
    res.json(userData);
  } catch (err) {
    res.end(`Fail to create a user: ${err}`);
  }
});
userRouter.put('/', (req, res) => {
  const modifiedUser = req.body;
  const exist = userData.some((x) => x.id === req.body.id);

  if (exist) {
    userData.forEach((a) => {
      if (a.id === modifiedUser.id) {
        a.name = modifiedUser.name ? modifiedUser.name : a.name;
        a.age = modifiedUser.age ? modifiedUser.age : a.age;
      }
    });
    res.json(userData);
  } else {
    res.end('[Fail to update user] No such user is found');
  }
});

userRouter.delete('/', (req, res) => {
  const found = userData.some((x) => x.id === req.body.id);
  let i = 0;
  let deleteIndex;

  if (found) {
    userData.forEach((x) => {
      if (x.id === req.body.id) {
        deleteIndex = i;
      }
      i += 1;
    });
    userData.splice(deleteIndex, deleteIndex);
    res.json(userData);
  } else {
    res.end('[Fail to delete user] No such user is found');
  }
});

export default userRouter;
