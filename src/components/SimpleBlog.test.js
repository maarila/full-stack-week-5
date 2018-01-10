import React from "react";
import {shallow} from "enzyme";
import SimpleBlog from "./SimpleBlog";

describe.only("<SimpleBlog />", () => {
  it("renders content", () => {
    const blog = {
      title: "Testaus käy kuin tanssi",
      author: "Majuri Testaaja",
      likes: 5
    };

    const simpleBlogComponent = shallow(
      <SimpleBlog blog={blog} onClick={() => console.log("Klik!")} />
    );

    const mainInfoDiv = simpleBlogComponent.find(".mainInfo");
    expect(simpleBlogComponent.text()).toContain(blog.title);
    expect(simpleBlogComponent.text()).toContain(blog.author);

    const contentDiv = simpleBlogComponent.find(".content");
    expect(contentDiv.text()).toContain(blog.likes);
  });

  it("clicking the button twice calls event handler twice", () => {
    const blog = {
      title: "Testaus käy kuin tanssi",
      author: "Majuri Testaaja",
      likes: 5
    };

    const mockHandler = jest.fn();

    const simpleBlogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    );

    const button = simpleBlogComponent.find("button");
    button.simulate("click");
    button.simulate("click");

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
