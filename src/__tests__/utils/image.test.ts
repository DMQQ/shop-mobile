import { image } from "@functions/image";
import { API } from "@constants/routes";

describe("image", () => {
  test("should return the uri of the image", () => {
    const input = "image.jpg";
    const result = image(input);
    expect(result).toEqual({ uri: `${API}/upload/images=${input}` });

    const input2 = [{ name: "image.jpg" }];

    const result2 = image(input2 as any);
    expect(result2).toEqual({ uri: `${API}/upload/images=${input2[0].name}` });
  });

  test("should return the notfound image if the input is null", () => {
    const input = null;
    const result = image(input);
    expect(result).toEqual(require("@assets/notfound.png"));
  });
});
