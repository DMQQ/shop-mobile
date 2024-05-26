import removeDuplicatesById from "functions/RemoveRepetition";

describe("RemoveRepetition", () => {
  test("should return the array without repetition", () => {
    const input = [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 1, name: "A" },
    ];
    const result = removeDuplicatesById(input, "id");
    expect(result).toEqual([
      { id: 1, name: "A" },
      { id: 2, name: "B" },
    ]);
  });
});
