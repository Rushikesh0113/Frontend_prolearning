import React, { useState, useCallback } from "react";
import CommentEditor from "./suggestion component/CommentEditor";
import CommentList from "./suggestion component/CommentList";
import { useSelector } from "react-redux";

const Suggestion = ({ topicId }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const status = useSelector((store) => store.user.status);
  const refreshComments = useCallback(() => {
    setRefreshTrigger((prev) => !prev);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Suggestion</h1>
      {status && (
        <CommentEditor topicId={topicId} refreshComments={refreshComments} />
      )}
      <CommentList topicId={topicId} refreshTrigger={refreshTrigger} refreshComments={refreshComments} />
    </div>
  );
};

export default Suggestion;
