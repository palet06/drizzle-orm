import React from "react";

const IdPage = ({ params }: { params: { id: number[] } }) => {
  return <div>{params.id}</div>;
};

export default IdPage;
