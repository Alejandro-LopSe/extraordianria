import { Application, Router } from "oak";

import { deleteEvent } from "./resolvers/delete.ts";
import { availableEvents } from "./resolvers/get.ts";
import { doctorAppointments } from "./resolvers/get.ts";
import { patientAppointments } from "./resolvers/get.ts";
import { addEvent } from "./resolvers/post.ts";
import { bookEvent } from "./resolvers/put.ts";

const router = new Router();

router
  .post("/addEvent", addEvent)
  .delete("/deleteEvent/:id", deleteEvent)
  .get("/Event/:id", availableEvents)
  .get("/Events", availableEvents)
  .put("/updateEvent", bookEvent);
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });