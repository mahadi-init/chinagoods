import { site } from "@/site-config";
import { cookies } from "next/headers";

export class Request {
  token?: string;

  constructor() {
    this.token = cookies().get("auth")?.value;
  }

  async get(url: string, tags?: string[]) {
    const response = await fetch(`${site.BACKEND_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      next: {
        revalidate: 60,
        tags: tags,
      },
    });
    const result = await response.json();
    return result.data;
  }

  async post(url: string, data: unknown) {
    const body = JSON.parse(
      JSON.stringify(data, (_, value) => (value === "" ? undefined : value)),
    );

    try {
      const res = await fetch(`${site.BACKEND_URL}${url}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });

      const result = await res.json();
      return result;
    } catch (err) {
      return null;
    }
  }
  async del(url: string) {
    try {
      await fetch(`${site.BACKEND_URL}${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  async update(url: string, data: unknown) {
    const body = JSON.parse(
      JSON.stringify(data, (_, value) => (value === "" ? undefined : value)),
    );

    try {
      const res = await fetch(`${site.BACKEND_URL}${url}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return false;
    }
  }
}
