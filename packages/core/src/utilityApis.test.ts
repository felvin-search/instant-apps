import { matchTriggerQueries } from "./utilityApis";

describe("Test matchTriggerQueries function", () => {
  it("should do default matching without any options", async () => {
    await expect(
      matchTriggerQueries(["trigger1", "trigger2"])({
        query: "trigger1",
      })
    ).resolves.toBeTruthy();

    await expect(
      matchTriggerQueries(["trigger1", "trigger2"])({
        query: "trigger2",
      })
    ).resolves.toBeTruthy();

    await expect(
      matchTriggerQueries(["trigger1", "trigger2"])({
        query: "trigger3",
      })
    ).resolves.toBeFalsy();

    await expect(
      matchTriggerQueries(["trigger1", "trigger2"])({
        query: "trigger1 trigger2",
      })
    ).resolves.toBeFalsy();
  });

  it("should handle substringMatch option", async () => {
    await expect(
      matchTriggerQueries(["trigger1", "trigger2"], {
        substringMatch: true,
      })({
        query: "trigger1 and something more",
      })
    ).resolves.toBeTruthy();

    await expect(
      matchTriggerQueries(["trigger1", "trigger2"], {
        substringMatch: true,
      })({
        query: "trigger2 and something more",
      })
    ).resolves.toBeTruthy();

    await expect(
      matchTriggerQueries(["trigger1", "trigger2"], {
        substringMatch: true,
      })({
        query: "trigger1",
      })
    ).resolves.toBeTruthy();
  });

  it("should handle caseSensitive flag", async () => {
    await expect(
      matchTriggerQueries(["TriggeR1", "trigger2"], {
        caseSensitive: true,
      })({
        query: "trigger1",
      })
    ).resolves.toBeFalsy();

    await expect(
      matchTriggerQueries(["TriggeR1", "trigger2"], {
        caseSensitive: true,
      })({
        query: "TriggeR1",
      })
    ).resolves.toBeTruthy();
  });

  it("should handle both caseSensitive and substringMatch flag", async () => {
    await expect(
      matchTriggerQueries(["TriggeR1", "trigger2"], {
        caseSensitive: true,
        substringMatch: true,
      })({
        query: "trigger1 and something more",
      })
    ).resolves.toBeFalsy();

    await expect(
      matchTriggerQueries(["TriggeR1", "trigger2"], {
        caseSensitive: true,
        substringMatch: true,
      })({
        query: "TriggeR1 and something more",
      })
    ).resolves.toBeTruthy();

    await expect(
      matchTriggerQueries(["TriggeR1", "trigger2"], {
        caseSensitive: true,
        substringMatch: true,
      })({
        query: "TriggeR1",
      })
    ).resolves.toBeTruthy();
  });

  it("should handle edge cases", async () => {
    await expect(
      matchTriggerQueries([""])({
        query: "trigger1 trigger2",
      })
    ).rejects.toThrowError();
  });
});
