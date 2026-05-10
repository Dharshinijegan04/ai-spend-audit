import { describe, it, expect } from "vitest";

import { generateAudit } from "../lib/auditEngine";

describe(
  "AI Spend Audit Engine",
  () => {

    it(
      "should recommend ChatGPT Plus for small teams",
      () => {

        const result =
          generateAudit(
            "ChatGPT",
            100,
            2,
            2
          );

        expect(
          result.recommendedPlan
        ).toBe("ChatGPT Plus");

      }
    );

    it(
      "should recommend ChatGPT Team for larger teams",
      () => {

        const result =
          generateAudit(
            "ChatGPT",
            300,
            10,
            10
          );

        expect(
          result.recommendedPlan
        ).toBe("ChatGPT Team");

      }
    );

    it(
      "should recommend Claude Pro for small teams",
      () => {

        const result =
          generateAudit(
            "Claude",
            100,
            2,
            2
          );

        expect(
          result.recommendedPlan
        ).toBe("Claude Pro");

      }
    );

    it(
      "should recommend Cursor Business for big teams",
      () => {

        const result =
          generateAudit(
            "Cursor",
            1000,
            15,
            15
          );

        expect(
          result.recommendedPlan
        ).toBe("Cursor Business");

      }
    );

    it(
      "should calculate yearly savings correctly",
      () => {

        const result =
          generateAudit(
            "ChatGPT",
            200,
            5,
            5
          );

        expect(
          result.yearlySavings
        ).toBe(
          result.savings * 12
        );

      }
    );

    it(
      "should never return negative yearly savings",
      () => {

        const result =
          generateAudit(
            "ChatGPT",
            10,
            1,
            1
          );

        expect(
          result.yearlySavings
        ).toBeGreaterThanOrEqual(0);

      }
    );

  }
);