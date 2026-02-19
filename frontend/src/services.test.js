import helpers from "./services";
import { test, expect } from "vitest";

test("groups requests by date", () => {
  const requests = [
    { received_at: new Date("2026-02-19T10:00:00"), id: 1 },
    { received_at: new Date("2026-02-19T09:00:00"), id: 2 },
    { received_at: new Date("2026-02-18T15:00:00"), id: 3 },
  ];

  const result = helpers.groupRequestsByDate(requests);
  expect(result).toHaveLength(2);
  expect(result[0].requests).toHaveLength(2);
  expect(result[1].requests).toHaveLength(1);
});
