import { test, expect } from "bun:test";
import { validateFlow } from "./validate-flow.mjs";
import { join } from "node:path";

test("this flow repo validates", () => {
  const r = validateFlow(join(import.meta.dir, ".."));
  if (!r.ok) console.error(r.errors.join("\n"));
  expect(r.ok).toBe(true);
});
