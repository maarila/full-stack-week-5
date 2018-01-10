import React from "react";
import {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Blog from "./Blog";

describe("<Blog />", () => {
  let blogComponent;

  beforeEach(() => {
    const user = {
      username: "ounou",
      name: "Taichi Ohno"
    };
    const blog = {
      author: "James Bond",
      title: "My Secret Secrets",
      url: "http://www.double-oh-seven.co.uk",
      likes: 5,
      user: user
    };

    const mockClick = jest.fn();
    const mockDelete = jest.fn();

    blogComponent = shallow(
      <Blog
        blog={blog}
        user={user}
        handleClick={mockClick}
        handleDelete={mockDelete}
      />
    );
  });

  it("at start only blog title is displayed", () => {
    const divShow = blogComponent.find(".shownFirst");
    expect(divShow.getElement().props.style).toEqual({display: ""});

    const div = blogComponent.find(".hiddenFirst");
    expect(div.getElement().props.style).toEqual({display: "none"});
  });

  it("after clicking the title, full info is displayed", () => {
    const title = blogComponent.find(".clickToOpen");

    title.simulate("click");

    const div = blogComponent.find(".hiddenFirst");
    expect(div.getElement().props.style).toEqual({display: ""});
  });
});
