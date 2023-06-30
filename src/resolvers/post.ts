import { RouterContext } from "oak/router.ts";
import { EventSchema } from "../db/schemas.ts";
import { Event } from "../types.ts";
import { EventsCollection } from "../db/mongo.ts";

type PostAddEventContext = RouterContext<
  "/addEvent",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

// months are 0-indexed, so 0 is January, 1 is February, etc.
const isValidDate = (
  dateval: Date
): boolean => {
  const date = new Date();
  console.log(date)
  console.log(dateval)
  return (
    date.getFullYear()===dateval.getFullYear()
  );
};

export const addEvent = async (context: PostAddEventContext): Promise<void> => {
  try {
    const result = context.request.body({ type: "json" });
    const value: Event = await result.value;
    if (!value?.fecha || !value?.hora_i || !value?.hora_f || !value?.invitados || !value?.titulo) {
      context.response.status = 400;
      return;
    }

    const { titulo, descripcion, fecha, hora_i, hora_f, invitados  } = value;

    const date = new Date(fecha);
    // check if date is valid
    /*if (!isValidDate(date)) {
      context.response.status = 400;
      return;
    }*/
    // check if Event is already booked
    const foundEvent = await EventsCollection.findOne({ date, hora_i, hora_f});
    if (foundEvent) {
      if (!foundEvent.available) {
        context.response.status = 400;
        return;
      } else {
        context.response.status = 200;
        return;
      }
    }
    
    const Event: Partial<Event> = {
      ...value,
      fecha: new Date(fecha) 
    };

    await EventsCollection.insertOne(Event as EventSchema);
    const { _id} = Event as EventSchema;
    context.response.body = Event;
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};