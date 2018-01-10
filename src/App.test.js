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

  describe("when user is logged", () => {
    beforeEach(() => {
      const user = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im91bm91IiwiaWQiOiI1YTU1MDE2MTAzOGMxNDYzMjBkZjIxOGYiLCJpYXQiOjE1MTU1OTcxMzZ9.ztNbghdO1Iyz7oehY8kV3UBExKeQbZkhBcy4RIm9G2o",
        username: "ounou",
        name: "Taichi Ounou"
      };
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      app = mount(<App />);
    });

    it("all notes are rendered", () => {
      app.update();
      const blogComponents = app.find(Blog);
      expect(blogComponents.length).toEqual(blogService.blogs.length);
    });
  });
});
