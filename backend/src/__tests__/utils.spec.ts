import {
  formatStringCase,
  snakeToCamelCase,
  camelToSnakeCase,
} from "../utils/index";

describe("Utils", () => {
  describe("snakeToCamelCase", () => {
    it("Should return the camelCase format of the string", () => {
      const str = "camel_case";
      const output = formatStringCase(snakeToCamelCase, str);
      expect(output).toBe("camelCase");
    });

    it("Should return the camelCase format of the keys' object", () => {
      const input = { user_id: 1, realisation_date: "2018-10-03" };
      const output = formatStringCase(snakeToCamelCase, input);
      expect(output).toEqual({
        userId: 1,
        realisationDate: "2018-10-03",
      });
    });

    it("Should return the string if it does not contain any underscore", () => {
      const str = "camelCase";
      const output = formatStringCase(snakeToCamelCase, str);
      expect(output).toBe("camelCase");
    });
  });

  describe("camelCaseToSnakeCase", () => {
    it("Should return the snakeCase format of the string", () => {
      const str = "camelCase";
      const output = formatStringCase(camelToSnakeCase, str);
      expect(output).toBe("camel_case");
    });

    it("Should return the snake format of the keys' object", () => {
      const input = { userId: 1, realisationDate: "2018-10-03" };
      const output = formatStringCase(camelToSnakeCase, input);
      expect(output).toEqual({
        user_id: 1,
        realisation_date: "2018-10-03",
      });
    });

    it("Should return the string if it is not camelCase format", () => {
      const str = "camel_case";
      const output = formatStringCase(camelToSnakeCase, str);
      expect(output).toBe("camel_case");
    });
  });
});
