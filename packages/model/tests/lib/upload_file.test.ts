import { afterAll, describe, expect, it, vi } from "vitest";
import { UploadFile } from "../../lib/upload_file";

const vercelBlob = vi.hoisted(() => ({
  del: vi.fn(),
  put: vi.fn().mockReturnValue({ url: "url_test" }),
}));
vi.mock("@vercel/blob", () => ({
  put: vercelBlob.put,
  del: vercelBlob.del,
}));

describe("uploadFile", () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it("uploadFile good", () => {
    const file = new File([], "file.jpg");
    UploadFile("business_logos", file, () => {});
    expect(vercelBlob.put).toBeCalledWith("business_logos/file.jpg", file, {
      access: "public",
    });
    expect(vercelBlob.del).not.toBeCalled();
  });

  it("uploadFile error", async () => {
    const file = new File([], "file.jpg");
    try {
      await UploadFile("business_logos", file, () => {
        throw new Error("Error");
      });
      expect(false).toBe(true);
    } catch (error) {
      expect(vercelBlob.put).toBeCalledWith("business_logos/file.jpg", file, {
        access: "public",
      });
      expect(vercelBlob.del).toBeCalledWith("url_test");
    }
  });
});
