const app = {
  initialize: () => {
    app.client = contentful.createClient({
      //CFPAT-PSqWaNZ_G1Jc0LnPzpAQr5aAqgE3h_9LrYKDL_hEaXk
      space: "hjvhhy784q8q",
      accessToken: "PDUbXJqfjtTIjfy2Lmk1TFOyk_gbXcsCcQVbZIqPlWw",
    });
    console.log("hello");
  },
  // getEntry: (entry) => {
  //   console.log("HERE13231");
  //   // a known issue with the contentful library is that embedded images are ignored in rich text
  //   // this is the current workaround: https://github.com/contentful/rich-text/issues/61
  //   // const options = {
  //   //   renderNode: {
  //   //     "embedded-asset-block": ({
  //   //       data: {
  //   //         target: { fields },
  //   //       },
  //   //     }) => {
  //   //       // debugger;
  //   //       return `<img src="${fields.file.url}" height="${fields.file.details.image.height}" width="${fields.file.details.image.width}" alt="${fields.description}"/>`;
  //   //     },
  //   //   },
  //   // };
  //   app.client.getEntry(entry).then((project) => {
  //     debugger;
  //     const projectData = {
  //       animalName: project.fields.animalName,
  //       imageUrl: `http:${project.fields.image.fields.file.url}`,
  //       imageTitle: project.fields.image.fields.title,
  //     };
  //     console.log(projectData);
  //     // load the template for this item from a local file
  //     // fetch("projectPage.mustache")
  //     //   .then((response) => response.text())
  //     //   .then((template) => {
  //     //     // render the template with the data
  //     //     const rendered = Mustache.render(template, projectData);
  //     //     // add the element to the container
  //     //     $(".container").append(rendered);
  //     //   });
  //   });
  // },
  getAllEntries: async () => {
    // first make sure we have our template loaded
    // i can use the word await along with async to pause the program until this function is finished
    const template = await app.loadTemplate();
    // fetch all entries
    app.client.getEntries().then((response) => {
      console.log("here 1");
      console.log(response);
      // go through each one
      response.items.forEach((project) => {
        // pull out the data you're interested in
        console.log(project);
        console.log("here");
        const projectData = {
          firstName: project.fields.firstName,
          lastName: project.fields.lastName,
          imageUrl: `http:${project.fields.image.fields.file.url}`,
          imageTitle: project.fields.image.fields.title,
        };
        console.log(projectData);
        const rendered = Mustache.render(template, projectData);
        // add the element to the container
        $(".container").append(rendered);
        // debugger;
        // const projectData = {
        //   title: project.fields.title,
        //   imageUrl: `http:${project.fields.image.fields.file.url}`,
        //   imageTitle: project.fields.image.fields.title,
        //   slug: `${project.fields.slug}.html`,
        // };
        // console.
        // const rendered = Mustache.render(template, projectData);
        // // add the element to the container
        // $(".container").append(rendered);
      });
    });
  },
  loadTemplate: () =>
    fetch("homeProject.mustache")
      .then((response) => response.text())
      .then((template) => template),
};
