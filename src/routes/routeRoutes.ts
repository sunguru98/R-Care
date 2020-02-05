import { Router } from 'express';
import { check, validationResult, body } from 'express-validator';
import multer from 'multer';

import upload from '../utils/multer';
import prepareRouteObject from '../utils/prepareRouteObject';
import authenticate from '../middleware/authenticate';
import Route from '../models/Route';

import {
  RouteRequest,
  RouteResponse,
  RoutesResponse,
  TMiniRoute
} from '../types/route.types';
import { ErrorMessage } from '../types/common.types';

const router = Router();

// @route - POST routes/
// @desc - Create a route.
// @access - Private (Auth)
router.post<{}, RouteResponse | ErrorMessage, RouteRequest>(
  '/',
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('direction', 'Direction is required')
    .not()
    .isEmpty(),
  check('status', 'Status is required')
    .not()
    .isEmpty(),
  check('stops', 'Stops is required')
    .not()
    .isEmpty(),
  check('routeType', 'Route Type is required')
    .not()
    .isEmpty(),
  body('stops').custom(val => {
    if (val.length >= 2) return true;
    else throw new Error('There should be atleast 2 stops');
  }),
  check('status', 'Status should be either active or inactive').isIn([
    'active',
    'inactive'
  ]),
  check('direction', 'Direction should be either UP or DOWN').isIn([
    'up',
    'down'
  ]),
  check('routeType', 'Route Type should be either AC or General').isIn([
    'ac',
    'general'
  ]),
  authenticate,
  async (req, res): Promise<typeof res> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .send(<ErrorMessage>{ statusCode: 400, message: errors.array() });
      const { name, direction, stops, routeType, status } = req.body;
      if (await Route.findOne({ name }))
        return res.status(400).send(<ErrorMessage>{
          statusCode: 400,
          message: 'Route already exists'
        });
      const route = new Route({
        name,
        direction,
        stops,
        routeType,
        status
      });
      route.user = req.user.id;
      await route.save();
      req.user.routes.push(route);
      await req.user.save();
      return res.status(201).send(<RouteResponse>{ statusCode: 201, route });
    } catch (err) {
      console.log(err);
      if (err.name === 'ValidationError')
        return res.status(400).send({
          statusCode: 400,
          message: 'Location type can only contain the name Point'
        });
      return res
        .status(500)
        .send(<ErrorMessage>{ statusCode: 500, message: 'Server Error' });
    }
  }
);

// @route - POST routes/multi
// @desc - Create multiple routes from CSV file.
// @access - Private (Auth)
router.post<{}, RoutesResponse | ErrorMessage, null>(
  '/multi',
  authenticate,
  (req, res): void => {
    upload(
      req,
      res,
      async (err: multer.MulterError | Error): Promise<typeof res> => {
        if (err) return res.send({ statusCode: 400, message: err.message });

        const csvData = req.file.buffer.toString('utf-8');
        const [titleRow, ...rest] = csvData.split('\n');
        const title = titleRow.split(',').slice(1);
        if (title.length < 5)
          return res.send({
            statusCode: 400,
            message: 'CSV Badly Formatted'
          });
        try {
          const routes = prepareRouteObject(rest, req.user);
          const routeDocs = await Route.insertMany([...routes]);
          const routeIds = routeDocs.map(r => r._id);
          req.user.routes.push(...routeIds);
          await req.user.save();
          return res.status(201).send({ statusCode: 201, routes: routeDocs });
        } catch (err) {
          if (err.message === 'CSV Badly Formatted')
            return res
              .status(400)
              .send(<ErrorMessage>{ statusCode: 400, message: err.message });
          else if (err.message.includes('Custom'))
            return res.status(400).send({
              statusCode: 400,
              message: JSON.parse(err.message.replace('Custom: ', ''))
            });
          return res
            .status(500)
            .send(<ErrorMessage>{ statusCode: 500, message: err.message });
        }
      }
    );
  }
);

// @route - GET routes/
// @desc - Get all the routes of the logged in user
// @access - Private (Auth)
router.get<{}, RoutesResponse | ErrorMessage, null>(
  '/',
  authenticate,
  async (req, res): Promise<typeof res> => {
    try {
      const { id } = req.user;
      const routes = (await Route.find({ user: id })) as TMiniRoute[];
      return res.send({
        statusCode: 200,
        routes: routes.map(({ name, status, user, _id }) => ({
          name,
          status,
          user,
          _id
        }))
      });
    } catch (err) {
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  }
);

// @route - GET routes/:id
// @desc - Get a route with respect to the user.
// @access - Private (Auth)
router.get<{ id: string }, RouteResponse | ErrorMessage, null>(
  '/:id',
  authenticate,
  async (req, res): Promise<typeof res> => {
    try {
      const { id } = req.params;
      if (!id)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Route Id Invalid' });
      const route = await Route.findOne({ user: req.user.id, _id: id });
      if (!route)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Route not found' });
      return res.send({ statusCode: 200, route });
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid Route Id' });
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  }
);

// @route - PUT routes/
// @desc - Update a route.
// @access - Private (Auth)
router.put<{ id: string }, RouteResponse | ErrorMessage, null>(
  '/:id',
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('direction', 'Direction is required')
    .not()
    .isEmpty(),
  check('status', 'Status is required')
    .not()
    .isEmpty(),
  check('stops', 'Stops is required')
    .not()
    .isEmpty(),
  check('routeType', 'Route Type is required')
    .not()
    .isEmpty(),
  body('stops').custom(val => {
    if (val.length >= 2) return true;
    else throw new Error('There should be atleast 2 stops');
  }),
  check('status', 'Status should be either active or inactive').isIn([
    'active',
    'inactive'
  ]),
  check('direction', 'Direction should be either UP or DOWN').isIn([
    'up',
    'down'
  ]),
  check('routeType', 'Route Type should be either AC or General').isIn([
    'ac',
    'general'
  ]),
  authenticate,
  async (req, res): Promise<typeof res> => {
    try {
      const { id } = req.params;
      if (!id)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Route Id Invalid' });
      const route = await Route.findOneAndUpdate(
        { user: req.user.id, _id: id },
        req.body,
        { new: true }
      );
      if (!route)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Route not found' });
      return res.send({ statusCode: 200, route });
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid Route Id' });
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  }
);

// @route - DELETE routes/:id
// @desc - Delete a route.
// @access - Private (Auth)
router.delete<{ id: string }, RouteResponse | ErrorMessage, null>(
  '/:id',
  authenticate,
  async (req, res): Promise<typeof res> => {
    try {
      const { id } = req.params;
      if (!id)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Route Id Invalid' });
      const route = await Route.findOneAndDelete({
        user: req.user.id,
        _id: id
      });
      if (!route)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Route not found' });
      return res.send({ statusCode: 200, route });
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid Route Id' });
      return res.status(500).send({ statusCode: 500, message: 'Server Error' });
    }
  }
);

export default router;
