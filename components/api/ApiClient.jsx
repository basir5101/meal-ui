import axios from "axios";

class ApiClient {
  async updateMeals(args, id) {
    try {
      let { data } = await axios.put(`http://localhost:1337/meals/${id}`, {
        names: args,
      });
      return data;
    } catch (error) {
      return false;
    }
  }

  async updateShoppings(args, id) {
    console.log(args);
    try {
      let { data } = await axios.put(`http://localhost:1337/meals/${id}`, {
        shoppings: args,
      });
      return data;
    } catch (error) {
      return false;
    }
  }

  async updateNames(args, id) {
    console.log(args);
    try {
      let { data } = await axios.put(`http://localhost:1337/meals/${id}`, {
        names: args,
      });
      return data;
    } catch (error) {
      return false;
    }
  }

  async updateDeposits(args, id) {
    try {
      let { data } = await axios.put(`http://localhost:1337/meals/${id}`, {
        names: args,
      });
      return data;
    } catch (error) {
      return false;
    }
  }
}

export default new ApiClient();
