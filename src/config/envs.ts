
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars
{
    PORT : number;
    PRODUCTS_MICROSERVICE_PORT : number;
    PRODUCTS_MICROSERVICE_HOST : string;

    ORDER_MICROSERVICE_PORT : number;
    ORDER_MICROSERVICE_HOST : string;
}

const envsScheme = joi.object
({
    PORT : joi.number().required(),
    PRODUCTS_MICROSERVICE_PORT : joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST : joi.string().required(),
    ORDER_MICROSERVICE_PORT : joi.number().required(),
    ORDER_MICROSERVICE_HOST : joi.string().required(),

}).unknown(true);


const {error, value} = envsScheme.validate(process.env);

if(error)
{
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars : EnvVars = value;

export const envs =
{
    port : envVars.PORT,

    productsMicroservicePort    : envVars.PRODUCTS_MICROSERVICE_PORT,
    productsMicroserviceHost    : envVars.PRODUCTS_MICROSERVICE_HOST,

    ordersMicroservicePort      : envVars.ORDER_MICROSERVICE_PORT,
    ordersMicroserviceHost      : envVars.ORDER_MICROSERVICE_HOST,
}