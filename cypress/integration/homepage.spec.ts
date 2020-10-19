/// <reference types="cypress" />
// cypress/integration/homepage.spec.ts

context("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
    // ^^ possible because we set the `baseUrl` config option
    //     in the project root's cypress.json

    cy.server();

    cy.route("https://codaisseur-coders-network-okta.herokuapp.com/posts", {
      count: 2,
      rows: [makeFakePost(1, "Fake post #1"), makeFakePost(2, "Fake post #2")],
    });
  });

  it("should show the list of articles as returned by the api", () => {
    cy.get("h2").eq(0).should("have.text", "Fake post #1");
    cy.get("h2").eq(1).should("have.text", "Fake post #2");
  });
});

function makeFakePost(id: number, title: string) {
  return {
    id,
    title,
    content: "Bla bla bla",
    createdAt: "2020-10-06T14:05:05.976Z",
    updatedAt: "2020-10-06T14:05:06.258Z",
    author_id: 2,
    tags: [],
    post_likes: [],
  };
}
