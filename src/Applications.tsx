import { useState } from "react";
import SingleApplication from "./SingleApplication";
import { Application } from "./types/application";
import styles from "./Applications.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getApplications } from "./api/applications";
import { Button } from "./ui/Button/Button";

const Applications = () => {
  const [page, setPage] = useState(1);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["applications"],
    queryFn: ({ pageParam = 1 }) => getApplications(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: page
  });

  const handleLoadMoreClick = () => {
    setPage((currentPage) => currentPage + 1);
    fetchNextPage();
  };

  const isFetchingInitialData = status === "pending";
  const hasError = status === "error";
  const shouldRenderLoadMoreButton = hasNextPage && !isFetchingNextPage && !isFetchingInitialData;

  return (
    <div className={styles.Applications}>
      {data?.pages.map((applications: Application[]) =>
        applications.map((application) => {
          return <SingleApplication application={application} key={application.guid} />;
        })
      )}
      {shouldRenderLoadMoreButton && (
        <Button onClick={handleLoadMoreClick} className={"load-more-btn"}>Load More</Button>
      )}
      {hasError && <div>Error loading applications</div>}
      {isFetchingInitialData && !data?.pages.length && <div>Loading applications...</div>}
    </div>
  );
};

export default Applications;