import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import axios from "axios";

import { RepoType } from "../shared/types";
import { GITHUB_API, PER_PAGE, USER_TYPES } from "../shared/constants";

import SearchInput from "./GlobalComponents/SearchInput";
import RadioGroup from "./GlobalComponents/RadioGroup";
import Pagination from "./GlobalComponents/Pagination";
import Table from "./GlobalComponents/Table";

const RepositorySearch = observer(() => {
  // Store repos fetched from Github API
  const [paginatedRepos, setPaginatedRepos] = useState<RepoType[]>([]);
  const [numRepos, setNumRepos] = useState<number>(0);

  // Keep track of search parameters
  const [userType, setUserType] = useState<string>("users"); // Default to "user" instead of "organization"
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [user, setUser] = useState<string>("");

  // Keep track of pagination
  const [page, setPage] = useState<number>(1);

  // Rerun API call when new user is searched, when new page is selected, or when new user type is selected
  useEffect(() => {
    fetchRepos();
  }, [user, page, userType]);

  // Async function that fetches data from Github API

  const fetchRepos = async () => {
    if (!user) return;
    try {
      // Get total number of repos for searched user
      const requestUrl: string = `${GITHUB_API}/${userType}/${user}/repos`;
      const { data } = await axios.get(requestUrl);
      setNumRepos(data.length);

      // Fetch repos by selected page and pluck out limited fields
      const paginatedRequestUrl: string =
        requestUrl + `?per_page=${PER_PAGE}&page=${page}`;
      const paginatedResponse = await axios.get(paginatedRequestUrl);
      let formattedData = [];
      if (paginatedResponse && paginatedResponse?.data) {
        formattedData = paginatedResponse.data.map((rawData: any) => ({
          id: rawData.id,
          name: rawData.name,
          language: rawData.language,
          url: rawData.url,
          stars: rawData.stargazers_count,
          forks: rawData.forks,
          open_issues: rawData.open_issues,
        }));
      }
      setPaginatedRepos(formattedData);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  // Search form handlers

  const handleSearch = () => {
    setPage(1);
    setNumRepos(0);
    setUser(searchQuery);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="p-4 text-2xl font-bold">Github Repository Search</h1>
        <SearchInput
          onChange={onSearchChange}
          value={searchQuery}
          onSubmit={handleSearch}
          onPressEnter={handleSearch}
          placeholder="Enter Github user or organization"
        />
        <RadioGroup
          options={USER_TYPES}
          onChange={onRadioChange}
          currentSelected={userType}
        />
        {paginatedRepos.length > 0 ? (
          <Table rows={paginatedRepos} />
        ) : (
          <div>No results. Try a different search?</div>
        )}
        <Pagination
          totalCount={numRepos}
          pageSize={PER_PAGE}
          currentPage={page}
          onPageClick={(num) => setPage(num)}
        />
      </div>
    </div>
  );
});

export default RepositorySearch;
