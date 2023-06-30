import { ObjectId } from "mongo";
import { RouterContext } from "oak/router.ts";
import { EventsCollection } from "../db/mongo.ts";
import { EventSchema } from "../db/schemas.ts";

type PutBookEventContext = RouterContext<
  "/bookEvent",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const bookEvent = async (context: PutBookEventContext) => {
  try {
    const value = await context.request.body().value;
    if (
      !value.year ||
      !value.month ||
      !value.day ||
      !value.hour ||
      !value.dni ||
      !value.id_doctor
    ) {
      context.response.status = 406;
      return;
    }
    const { year, month, day, hour, dni, id_doctor} = value;
    const Event = await EventsCollection.findOne({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: parseInt(hour),
      id_doctor: id_doctor,
      available: true,
    });
    if (!Event) {
      context.response.status = 404;
      return;
    }
    await EventsCollection.updateOne(
      { _id: Event._id },
      { $set: { available: false, dni } }
    );
    context.response.status = 200;
    const { _id, ...rest } = Event;
    context.response.body = { ...rest, available: false, dni };
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};

