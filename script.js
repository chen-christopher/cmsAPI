const app = {
  initialize: () => {
    app.client = contentful.createClient({
      //CFPAT-PSqWaNZ_G1Jc0LnPzpAQr5aAqgE3h_9LrYKDL_hEaXk
      space: "hjvhhy784q8q",
      accessToken: "PDUbXJqfjtTIjfy2Lmk1TFOyk_gbXcsCcQVbZIqPlWw",
    });
    console.log("hello");
  },
  getAllEntries: async () => {
    // first make sure we have our template loaded
    // i can use the word await along with async to pause the program until this function is finished
    const template = await app.loadTemplate();
    const template2 = await app.loadTemplate2();
    // fetch all entries
    app.client.getEntries().then((response) => {
      console.log("here 1");
      console.log(response);
      // go through each one
      response.items.forEach((project) => {
        // pull out the data you're interested in
        console.log(project);
        console.log("here");
        if (project.fields.firstName) {
          const projectData = {
            firstName: project.fields.firstName,
            lastName: project.fields.lastName,
            imageUrl: `http:${project.fields.image.fields.file.url}`,
            imageTitle: project.fields.image.fields.title,
            imageDescription: project.fields.image.fields.description,
          };
          console.log(projectData);
          const rendered = Mustache.render(template, projectData);
          $(".container1").append(rendered);
        } else {
          const project2Data = {
            facts: project.fields.facts,
            rating: project.fields.rating,
            review: project.fields.review,
          };
          console.log(project2Data);
          const rendered = Mustache.render(template2, project2Data);
          $(".container2").append(rendered);
        }

        // add the element to the container
      });
    });
  },
  loadTemplate: () =>
    fetch("homeProject.mustache")
      .then((response) => response.text())
      .then((template) => template),
  loadTemplate2: () =>
    fetch("secondProject.mustache")
      .then((response) => response.text())
      .then((template) => template),
};
