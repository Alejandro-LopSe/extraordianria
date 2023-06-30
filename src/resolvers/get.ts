import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { ObjectId } from "mongo";
import { RouterContext } from "oak/router.ts";
import { EventsCollection } from "../db/mongo.ts";
import { EventSchema } from "../db/schemas.ts";

type GetAvailabeEventsContext = RouterContext<
  "/availableEvents",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

type doctorAP = RouterContext<
"/doctorAppointments/:id_doctor",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

type pacienteAP = RouterContext<
"/patientAppointments/:dni",
  Record<string | number, string | undefined>,
  Record<string, any>
>;


export const patientAppointments = async (context: pacienteAP) => {
  try {
    const params = getQuery(context, { mergeParams: true });
    if (!params.year || !params.month || !params.day || !dni) {
      context.response.status = 403;
      return;
    }

    const { year, month, day ,dni} = params;
    if (!day && !id_doctor) {
      const Events = await EventsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          dni: parseInt(dni),
          available: true,
        })
        .toArray();
        context.response.body = context.response.body = Events.map((Event) => {
        const { _id, ...rest } = Event;
        return rest;
      });
    }
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};

//-----------------------------------------------------------------------------------------

export const doctorAppointments = async (context: doctorAP) => {
  try {
    const params = getQuery(context, { mergeParams: true });
    if (!params.year || !params.month|| !params.day || !params.id_doctor) {
      context.response.status = 403;
      return;
    }

    const { year, month, day ,id_doctor} = params;
    if (!day && !id_doctor) {
      const Events = await EventsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          id_doctor: id_doctor,
          available: true,
        })
        .toArray();
        context.response.body = context.response.body = Events.map((Event) => {
        const { _id, ...rest } = Event;
        return rest;
      });
    }
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};

//---------------------------------------------------------------------------------

export const availableEvents = async (context: GetAvailabeEventsContext) => {
  try {
    const params = getQuery(context, { mergeParams: true });
    if (!params.year || !params.month) {
      context.response.status = 403;
      return;
    }

    const { year, month, day ,id_doctor} = params;
    if (!day && !id_doctor) {
      const Events = await EventsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          available: true,
        })
        .toArray();
        context.response.body = context.response.body = Events.map((Event) => {
        const { _id, ...rest } = Event;
        return rest;
      });
    } else if(!id_doctor){
      const Events = await EventsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
          available: true,
        })
        .toArray();
      context.response.body = Events.map((Event) => {
        const { _id, ...rest } = Event;
        return rest;
      });
    }else if(!dia){
      const Events = await EventsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          id_doctor: id_doctor,
          available: true,
        })
        .toArray();
      context.response.body = Events.map((Event) => {
        const { _id, ...rest } = Event;
        return rest;
      });
    }else{
      const Events = await EventsCollection
        .find({
          year: parseInt(year),
          month: parseInt(month),
          id_doctor: id_doctor,
          available: true,
          day: parseInt(day),
        })
        .toArray();
      context.response.body = Events.map((Event) => {
        const { _id, ...rest } = Event;
        return rest;
      });
    }
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};
