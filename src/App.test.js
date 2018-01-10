import React from "react";
import {mount} from "enzyme";
import App from "./App";
import Blog from "./components/Blog";
import Login from "./components/Login";
jest.mock("./services/blogs");
import blogService from "./services/blogs";

describe("<App />", () => {
  let app;

  describe("when user is not logged", () => {
    beforeEach(() => {
      app = mount(<App />);
    });

    it("only login form is rendered", () => {
      app.update();
      expect(app.text()).toContain("Log in to application");
    });
  });
});
