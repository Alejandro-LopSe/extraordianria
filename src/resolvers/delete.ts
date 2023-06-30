import { RouterContext } from "oak/router.ts";
import { ObjectId } from "mongo";
import { EventsCollection } from "../db/mongo.ts";
import { getQuery } from "oak/helpers.ts";

type deleteEventContext = RouterContext<
  "/deleteEvent/:id",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const deleteEvent = async (context: deleteEventContext) => {
  try {
    const id = req.params.id;;
    if (!id) {
      context.response.status = 406;
      return;
    }
    console.log(id)
    const Event = await EventsCollection.findOne({id});
    if (!Event) {
      context.response.status = 404;
      return;
    }

    await EventsCollection.deleteOne({ _id: id });
    context.response.status = 200;
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};