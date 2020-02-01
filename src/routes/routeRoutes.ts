import { Router } from 'express';
import { check, validationResult, body } from 'express-validator';
import multer = require('multer');

import upload from '../utils/multer';
import prepareRouteObject from '../utils/prepareRouteObject';
import authenticate from '../middleware/authenticate';
import Route from '../models/Route';

import {
  RouteRequest,
  RouteResponse,
  RoutesResponse
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
      const route = await Route.create({
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

export default router;
