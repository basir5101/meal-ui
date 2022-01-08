import axios from "axios";
import { getSession } from "next-auth/react";

class ApiClient {
  async getAuthHeader(req = null) {
    let header = {};
    let session = null;
    if (req) {
      session = await getSession({ req });
    } else {
      session = await getSession();
    }

    if (session && session.jwt) {
      header = { Authorization: `Bearer ${session.jwt}` };
    }

    return header;
  }

  async saveMonth(title) {
    const headers = await this.getAuthHeader();
    try {
      let { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/meals`,
        {
          title,
        },
        {
          headers: headers,
        }
      );
      return data;
    } catch (error) {}
  }

  async getMealById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`);
    const data = await res.json();
    return data;
  }

  async getMealByUserId(id) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/meals?user.id=${id}&_sort=id:DESC`
    );
    const data = await res.json();
    return data;
  }
  async updateMeals(args, id) {
    const headers = await this.getAuthHeader();
    try {
      let { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`,
        {
          names: args,
        },
        {
          headers: headers,
        }
      );
      return data;
    } catch (error) {
      return false;
    }
  }

  async updateShoppings(args, id) {
    const headers = await this.getAuthHeader();
    try {
      let { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`,
        {
          shoppings: args,
        },
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      return false;
    }
  }

  async updateExtraCost(args, id) {
    const headers = await this.getAuthHeader();
    try {
      let { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`,
        {
          extraCost: args,
        },
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      return false;
    }
  }

  async getMonthsByUser(userId) {
    try {
      let { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`
      );
      return data;
    } catch (error) {
      return false;
    }
  }

  async updateNames(args, id) {
    const headers = await this.getAuthHeader();
    try {
      let { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`,
        {
          names: args,
        },
        {
          headers: headers,
        }
      );
      return data;
    } catch (error) {
      return false;
    }
  }

  async updateDeposits(args, id) {
    const headers = await this.getAuthHeader();
    try {
      let { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`,
        {
          names: args,
        },
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      return false;
    }
  }

  async registerUser(args) {
    const headers = await this.getAuthHeader();
    try {
      let { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
        args,
        {
          headers: headers,
        }
      );
      return data;
    } catch (error) {
      return error;
    }
  }
  async resetPassword(args) {
    const headers = await this.getAuthHeader();

    let { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        email: args.email,
      },
      {
        headers: headers,
      }
    );
  }
}

export default new ApiClient();
