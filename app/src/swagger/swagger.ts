// swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
const options = {
  definition: {
    openapi: '3.0.0', // Specify OpenAPI version
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'A simple Express API documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Your server URL
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/dto/*.ts'], // Path to your route files for annotation scanning
};

const swaggerSpec = swaggerJsdoc(options);


export function initiateSwagger(app: Express) {
  // Swagger page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

}
