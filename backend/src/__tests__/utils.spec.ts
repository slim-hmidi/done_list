import { snakeToCamelCase } from "../utils/index";

describe("Utils", () => {
  describe("snakeToCamelCase", () => {
    it("Should return the camelCase format of the string", () => {
      const str = "camel_case";
      const output = snakeToCamelCase(str);
      expect(output).toBe("camelCase");
    });

    it("Should return the camelCase format of the keys' object", () => {
      const input = { user_id: 1, realisation_date: "2018-10-03" };
      const output = snakeToCamelCase(input);
      expect(output).toEqual({
        userId: 1,
        realisationDate: "2018-10-03",
      });
    });

    it("Should return the string if it does not contain any underscore", () => {
      const str = "camelCase";
      const output = snakeToCamelCase(str);
      expect(output).toBe("camelCase");
    });
  });
});
