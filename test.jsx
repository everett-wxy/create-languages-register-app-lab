import React from "react";

const test = () => {
  const founders = [
    {
      name: "Elizabeth Holmes",
      title: "CEO",
      credential: "MBA from SuperLegit University",
      id: 1,
    },
    {
      name: "Sam Bankman-Fried",
      title: "CFO",
      credential: "CPA from TotallyReal State",
      id: 2,
    },
    {
      name: "Matt Damon",
      title: "CMO",
      credential: "Was in that movie you saw",
      id: 3,
    },
  ];

  const founderList = founders.map((founder) => {
    return (
      <FounderSection
        founder={founder}
        propOne="I am property one"
        propTwo="I am property two"
      />
    );
  });

  const FounderSection = (props) => {
    const { founder } = props.founder;
    const { propOne } = props.propOne;
    const { propTwo } = props.propTwo;

    return (
      <li>
        <h3>
          Hello, I'm {founder.name} the {founder.title}!
        </h3>
        <p>{founder.credential}</p>
        <p>{propOne}</p>
        <p>{propTwo}</p>
      </li>
    );
  };

  return <div>{founderList}</div>;
};

export default test;
